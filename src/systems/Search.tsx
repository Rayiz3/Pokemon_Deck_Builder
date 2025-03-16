import { Accessor, createSignal, Setter } from "solid-js"
import { dataSys } from "./Data"
import { entrySys } from "./Entry"
import { createStore, SetStoreFunction } from "solid-js/store";

export type searchingTypes = "pokemon" | "item" | "ability" | "none";

interface searchingTextType {
    pokemon: string;
    item: string;
    ability: string;
}

class SearchSys {
    searchingText: searchingTextType
    setSearchingText: SetStoreFunction<searchingTextType>

    focusedBox: Accessor<searchingTypes>
    setFocusedBox: Setter<searchingTypes>

    filteredPokemonList: Accessor<string[]>
    setFilteredPokemonList: Setter<string[]>

    filteredItemList: Accessor<string[]>
    setFilteredItemList: Setter<string[]>

    filteredAbilityList: Accessor<string[]>
    setFilteredAbilityList: Setter<string[]>

    placeholder: searchingTextType = {
        pokemon: '',
        item: '',
        ability: '',
    }

    constructor() {
        ([this.searchingText, this.setSearchingText] = createStore<searchingTextType>(this.placeholder)),
        ([this.focusedBox, this.setFocusedBox] = createSignal<searchingTypes>("none")),
        ([this.filteredPokemonList, this.setFilteredPokemonList] = createSignal<string[]>([])),
        ([this.filteredItemList, this.setFilteredItemList] = createSignal<string[]>([])),
        ([this.filteredAbilityList, this.setFilteredAbilityList] = createSignal<string[]>([]))
    }

    initialize = () => {
        this.setFilteredPokemonList(dataSys.listName);
        this.setFilteredItemList(dataSys.listItem);
    }

    filterList = (searchType: searchingTypes) => {
        this.initialize();

        if (searchType == "pokemon") {
            this.setFilteredPokemonList(
                this.filteredPokemonList().filter(
                    item =>item.toLowerCase().includes(this.searchingText.pokemon.toLowerCase())
                )
            );
        } else if (searchType == "item") {
            this.setFilteredItemList(
                this.filteredItemList().filter(
                    item =>item.toLowerCase().includes(this.searchingText.item.toLowerCase())
                )
            );
        } else if (searchType == "ability") {
            this.setFilteredAbilityList(
                this.filteredAbilityList().filter(
                    ability =>ability.toLowerCase().includes(this.searchingText.ability.toLowerCase())
                )
            );
        }
    }

    selectPokemon = (name: string) => {
        searchSys.setSearchingText("pokemon", name);

        if (entrySys.curFocused() >= 0) {
            entrySys.setFocusedPokemonInfo(entrySys.curFocused(), name);
        } else {
            dataSys.getPokemonInfo(name);
        }
        
        if(typeof dataSys.curPokemonInfo.ability == "string") {
          dataSys.curPokemonInfo.ability = dataSys.curPokemonInfo.ability.split("|");
        }
        
        this.setFilteredAbilityList(dataSys.curPokemonInfo.ability);
    }

    selectItem = (item: string) => {
        if (entrySys.entryList[entrySys.curFocused()].name) {
            searchSys.setSearchingText("item", item);
            if (entrySys.curFocused() >= 0) {
                const matchedInfo = dataSys.itemInfo.find(singleInfo => singleInfo.name == item);
                entrySys.setEntryList(entrySys.curFocused(), "item", matchedInfo? matchedInfo : {index: 0, name: ""});
            }
        }
    }

    selectAbility = (ability: string) => {
        if (entrySys.entryList[entrySys.curFocused()].name) {
            searchSys.setSearchingText("ability", ability);
            if (entrySys.curFocused() >= 0) {
                entrySys.setEntryList(entrySys.curFocused(), "ability", ability);
            }
        }
    }
}

export const searchSys = new SearchSys()