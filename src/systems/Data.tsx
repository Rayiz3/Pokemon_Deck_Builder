import Papa from "papaparse";
import { Accessor, createSignal, Setter } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { searchSys } from "./Search";


interface teamInfoType {
  rank: number;
  team: entryInfoType[];
}

interface entryInfoType {
  name: string;
  type: string[];
  terra_type: string;
  item: string;
  ability: string;
  skills: string[];
}

interface pokemonInfoType {
  order: number;
  index: number;
  name: string;
  subname: string;
  type1: string;
  type2: string;
  ability: string[] | string;
  total: number;
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  constraint: string;
  pick: number;
}

export interface itemInfoType {
  index: number;
  name: string;
}

export interface typeInfoType {
  index: number;
  name: string;
  color: string;
}

class DataSys {
    curPokemonInfo: pokemonInfoType
    setCurPokemonInfo: SetStoreFunction<pokemonInfoType>

    selectedType: Accessor<number>
    setSelectedType: Setter<number>

    constructor() {
      ([this.curPokemonInfo, this.setCurPokemonInfo] = createStore<pokemonInfoType>({
        order: 0,
        index: 0,
        name: "",
        subname: "",
        type1: "",
        type2: "",
        ability: [],
        total: 0,
        H: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        S: 0,
        constraint: "",
        pick: 0.0,
      })),
      ([this.selectedType, this.setSelectedType] = createSignal<number>(0))
  }

    teamInfo: teamInfoType[] = [];
    pokemonInfo: pokemonInfoType[] = [];
    itemInfo: itemInfoType[] = [];
    typeInfo: typeInfoType[] = [];

    listName: string[] = [];
    listItem: string[] = [];

    // loading csv & json files
    initialize = async () => {
      try {
        // pokemon
        const response1 = await fetch("/pokemon_info.csv");
        const csvText1 = await response1.text();
        const pokemonInfoResults = Papa.parse<pokemonInfoType>(csvText1, {
          header: true,
          skipEmptyLines: true,
        });
        this.pokemonInfo = pokemonInfoResults.data.map((row) => {
          return {
            ...row,
            subname: row.name.includes('_')? row.name.split('_')[1] : "",
            ability: (typeof row.ability === "string")? row.ability.split("|") : [],
          };
        });
        this.listName = this.pokemonInfo.map((row) => row.name);

        // item
        const response2 = await fetch("/pokemon_item.csv");
        const csvText2 = await response2.text();
        const itemInfoResults = Papa.parse<itemInfoType>(csvText2, {
          header: true,
          skipEmptyLines: true,
        });
        this.itemInfo = itemInfoResults.data;
        this.listItem = this.itemInfo.map((row) => row.name);

        // type
        const response3 = await fetch("/pokemon_type.csv");
        const csvText3 = await response3.text();
        const typeInfoResults = Papa.parse<typeInfoType>(csvText3, {
          header: true,
          skipEmptyLines: true,
        });
        this.typeInfo = typeInfoResults.data.map((row) => {
          return {
            ...row,
            index: Number(row.index),
          };
        });

        // ranker
        const response4 = await fetch("/2024_world_championship_result.json");
        const jsonData = await response4.json();
        this.teamInfo = jsonData.record.map((row: any) => {
          return {
            rank: Number(row.rank),
            team: row.team.map((teamRow: any) => ({
              name: teamRow.name,
              type: teamRow.type,
              terra_type: teamRow.terra_type,
              item: teamRow.item,
              ability: teamRow.ability,
              skills: teamRow.skills,
            })),
          };
        });
      }
      catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    getPokemonInfo = (name: string): pokemonInfoType => {
      const matchedInfo = this.pokemonInfo.find(singleInfo => singleInfo.name === name);
      
      if (matchedInfo) {
        this.setCurPokemonInfo(matchedInfo);
        return matchedInfo;
      } else {
        this.resetCurPokemonInfo();
        searchSys.setSearchingText("pokemon", "");
        searchSys.setSearchingText("item", "");
        searchSys.setSearchingText("ability", "");
        searchSys.setFilteredAbilityList([]);
        return this.curPokemonInfo;
      }
    };

    resetCurPokemonInfo = () => {
      this.setCurPokemonInfo({
        order: 0,
        index: 0,
        name: "",
        subname: "",
        type1: "",
        type2: "",
        ability: [],
        total: 0,
        H: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        S: 0,
        constraint: "",
        pick: 0.0,
      });
    }

    getTypeColorByName = (name: string) => {
      const typeInfo = dataSys.typeInfo.find((item) => item.name == name.toLowerCase());
      return typeInfo? typeInfo.color : '#000000'
    }

    formatFloat(num: number): string {
      const ratio = num / 106 * 100;
      return `${Math.floor(ratio).toString()}.${(ratio % 1).toFixed(1).slice(-1)}`;
    }
}

export const dataSys = new DataSys()