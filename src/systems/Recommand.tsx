import { dataSys, itemInfoType, typeInfoType } from "./Data";
import { entrySys } from "./Entry";

interface entryDistanceType {
    rank: number;
    entry: string[];
    distance: number;
}

interface entrySettingsType {
    tera: string[];
    item: string[];
    ability: string[];
    moves: string[];
}

interface entrySettingType {
    name: string;
    tera: string;
    item: string;
    ability: string;
    moves: string[];
}

class RecommandSys {

    maxRank: number = 106;

    getDistance = (entry1: string[], entry2: string[]) => {
        return entry1.reduce((acc, pokemon) => {
            return acc + (entry2.includes(pokemon)? 1 : 0);
        }, 0)
    }

    getStatistics = (myEntry: string[], nearEntries: entryDistanceType[]) => {
        const myEntryStat: Record<string, entrySettingsType> = myEntry.reduce((acc, pokemon) => {
            acc[pokemon] = {
                tera: [],
                item: [],
                ability: [],
                moves: [],
            };
            return acc;
        }, {} as Record<string, entrySettingsType>);

        for (const entry of nearEntries) {
            const nearEntry = dataSys.rankerInfo[entry.rank - 1].team;

            if (!nearEntry) continue;

            for (const referPokemon of nearEntry) {
                const name = referPokemon.name;
                if (myEntry.includes(name)) {
                    myEntryStat[name].tera.push(referPokemon.terra_type);
                    myEntryStat[name].item.push(referPokemon.item);
                    myEntryStat[name].ability.push(referPokemon.ability);
                    myEntryStat[name].moves.push(...referPokemon.skills);
                }
            }
        }
        return myEntryStat;
    }

    knn = (entry: string[], N: number = 10) => {
        let entriesByDistance: entryDistanceType[] = [];
        
        for (let i=0; i < dataSys.rankerInfo.length; i++) {
            const comparingEntry = dataSys.rankerInfo[i].team.map((i) => i.name);
            entriesByDistance.push({
                rank: i+1,
                entry: comparingEntry,
                distance: this.getDistance(entry, comparingEntry)
            })
        }

        const nearEntries = entriesByDistance.sort((a, b) => b.distance - a.distance).slice(0, N);

        const score = this.maxRank - nearEntries.reduce((acc, entry) => acc + entry.rank, 0) / N;

        return {nearEntries: nearEntries, score: score};
    }

    run = (N: number = 10) => {
        const myEntry: string[] = entrySys.entryList.map((row) => row.name)

        const knnReturn = this.knn(myEntry, N=N);
        const nearEntries = knnReturn.nearEntries;
        const score = knnReturn.score;
        const myEntryStat = this.getStatistics(myEntry, nearEntries);

        const counterParser = (data: string[], numItem: number = 1) => {
            const elementCounts: Record<string, number> = {};
            data.forEach((item) => {
                elementCounts[item] = (elementCounts[item] || 0) + 1;
            });
        
            const countedItems: [string, number][] = Object.entries(elementCounts);
        
            const sortedItems: [string, number][] = countedItems.sort((a, b) => b[1] - a[1]);
        
            const topItems: string[] = sortedItems.slice(0, numItem).map((item) => item[0]);
        
            return topItems;
        }

        const recommand: entrySettingType[] = []

        for (const name of Object.keys(myEntryStat)) {
            const index = entrySys.entryList.findIndex((pokemon) => pokemon.name == name);
            const rec_item = dataSys.itemInfo.find(singleInfo => singleInfo.name == counterParser(myEntryStat[name].item)[0]);
            const rec_ability = counterParser(myEntryStat[name].ability)[0]
            const rec_tera = dataSys.typeInfo.find(singleInfo => singleInfo.name == counterParser(myEntryStat[name].tera)[0])
            const rec_moves = counterParser(myEntryStat[name].moves, 4);
            // console.log(myEntryStat[name].tera);
            // console.log(name, rec_item, rec_ability, rec_tera, rec_moves);
            entrySys.setEntryList(index, "item", rec_item? rec_item : {index: 0, name: "--"});
            entrySys.setEntryList(index, "ability", rec_ability? rec_ability : "--");
            entrySys.setEntryList(index, "tera", rec_tera? rec_tera : {index: 0, name: "", color: ""});
            entrySys.setEntryList(index, "moves", rec_moves? rec_moves : ["", "", "", ""]);
        }

        return recommand
    }
}

export const recommandSys = new RecommandSys()