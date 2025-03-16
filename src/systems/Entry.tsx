import { Accessor, createSignal, Setter } from "solid-js"
import { createStore, SetStoreFunction } from "solid-js/store";
import { dataSys, itemInfoType, typeInfoType } from "./Data";
import { graphSys } from "./Graph";
import { searchSys } from "./Search";

interface Pokemon {
    name: string,
    subname: string,
    type1: string,
    type2: string,
    item: itemInfoType,
    ability: string,
    tera: typeInfoType,
    moves: string[]
}

export type cardType = "pokemon" | "add" | "empty";

class EntrySys {
    entryList: Pokemon[] | []
    setEntryList: SetStoreFunction<Pokemon[] |[]>

    curFocused: Accessor<number>
    setCurFocused: Setter<number>

    isMoves: Accessor<boolean>
    setIsMoves: Setter<boolean>

    moveButMessage: Accessor<string>
    setMoveButMessage: Setter<string>

    constructor() {
        ([this.entryList, this.setEntryList] = createStore<Pokemon[] | []>([])),
        ([this.curFocused, this.setCurFocused] = createSignal<number>(-1)),
        ([this.isMoves, this.setIsMoves] = createSignal<boolean>(false)),
        ([this.moveButMessage, this.setMoveButMessage] = createSignal<string>("See Moves"))
    }

    addPokemon = (name: string) => {

        let pokemon: Pokemon = {
            name: name,
            subname: "",
            type1: "",
            type2: "",
            item: {index: 0, name: "--"},
            ability: "--",
            tera: {index: 0, name: "", color: ""},
            moves: ["", "", "", ""]
        };
        if (this.entryList.length < 6){
            this.setEntryList([...this.entryList, pokemon])
            this.setFocusedPokemonInfo(this.entryList.length - 1, name);

            if(typeof dataSys.curPokemonInfo.ability == "string") {
              dataSys.curPokemonInfo.ability = dataSys.curPokemonInfo.ability.split("|");
            }
            searchSys.setFilteredAbilityList(dataSys.curPokemonInfo.ability);
        }
    }

    removePokemon = (index: number) => {

        if (index == this.curFocused()) {
            dataSys.resetCurPokemonInfo();
            this.setCurFocused(-1)
        }
        this.setEntryList(this.entryList.filter((_, i) => i !== index));
        graphSys.updateSelectedNodes(this.entryList.map((row) => row.name));
    }

    setFocusedPokemonInfo = (index: number, name: string) => {
        this.setCurFocused(index);
        let info = dataSys.getPokemonInfo(name);

        if (this.curFocused() >= 0 && this.entryList[index].name != name) {
            this.setEntryList(index, "name", name);
            this.setEntryList(index, "subname", info.subname);
            this.setEntryList(index, "type1", info.type1);
            this.setEntryList(index, "type2", info.type2);
            this.setEntryList(index, "item", {index: 0, name: "--"});
            this.setEntryList(index, "ability", "--");
            this.setEntryList(index, "tera", {index: 0, name: "", color: ""});
            this.setEntryList(index, "moves", ["", "", "", ""]);
        }
        graphSys.updateSelectedNodes(this.entryList.map((row) => row.name));
    }

    setFocusedTypeInfo = (tera: number) => {
        if (this.curFocused() >= 0 && this.entryList[this.curFocused()].name) {
            const matchedInfo = dataSys.typeInfo.find(singleInfo => singleInfo.index == tera);
            if (matchedInfo) {
                this.setEntryList(this.curFocused(), "tera", matchedInfo);
            }
        }
        dataSys.setSelectedType(tera);
    }

    setFocusedMoves = (index: number, text: string) => {
        if (this.curFocused() >= 0 && this.entryList[this.curFocused()].name) {
            let curMoves = [...this.entryList[this.curFocused()].moves];
            curMoves[index] = text;
            this.setEntryList(this.curFocused(), "moves", curMoves);
        }
    }
}

export const entrySys = new EntrySys()