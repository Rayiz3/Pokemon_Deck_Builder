import { For, Component, Show, createEffect, on, Match, Switch } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size, zIndex } from '../property/Size';
import { searchSys } from '../systems/Search';
import { searchingTypes } from '../systems/Search';

const SearchAreaStyle = (searchType: searchingTypes) => { return css({
  // flex
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  // position
  position: "relative",
  // scale
  width: (searchType == "pokemon")? Size.button.searchW : '100%',
  // text
  fontSize: Size.fontSizes.xs,
  textAlign: "left",
})};

const PokemonSearchBoxStyle = css({
  // scale
  width: "100%",
  height: Size.button.searchH,
  // color
  backgroundColor: Colors.background,
  // space
  paddingLeft: Size.space.l,
  paddingRight: Size.space.l,
  boxSizing: "border-box",
  // other
  border: "2px solid",
  borderColor: Colors.textMain,
  borderRadius: Size.button.searchH/2,
});

const SettingsSearchBoxStyle = css({
  // scale
  height: Size.button.searchH,
  // color
  backgroundColor: Colors.background,
  // space
  paddingLeft: Size.space.s,
  paddingRight: Size.space.s,
  boxSizing: "border-box",
  // other
  border: "1px solid",
  borderColor: Colors.textLight,
  borderRadius: Size.radius.s,

});

const DropStyle = (searchType: searchingTypes) => { return css({
  // flex
  // position
  position: 'absolute',
  zIndex: zIndex.dropdown,
  left: (searchType == "pokemon")? Size.button.searchH/2 : Size.radius.s,
  ...(searchType === 'pokemon' && { top: Size.button.searchH }),
  ...(searchType !== 'pokemon' && { bottom: Size.button.searchH }),
  // scale
  width: (searchType == "pokemon")? `calc(100% - ${Size.button.searchH}px)` : `calc(100% - ${2 * Size.radius.s}px)`,
  maxHeight: "20vh",
  boxSizing: "border-box",
  // text
  // color
  backgroundColor: Colors.background,
  // space
  margin: "0",
  padding: Size.space.xs,
  // other
  border: "1px solid",
  borderColor: Colors.borderLight,
  borderRadius: Size.radius.xs,
  listStyle: "none",
  overflow: "auto",

  '::-webkit-scrollbar': {
    width: '5px',
    
  },
  '::-webkit-scrollbar-thumb': {
    background: `${Colors.sub}`,
    borderRadius: '1px',
  },
})};

const ItemStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: '14px',
  // color
  // space
  padding: Size.space.s,
  // other
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  borderRadius: Size.radius.xs,

  ':hover': {
    backgroundColor: Colors.backgroundHover
  }
});

const SearchBox: Component<{searchType: searchingTypes, placeholder: string}> = ({searchType, placeholder}) => {
    createEffect(on(() => searchSys.searchingText.pokemon,
                    () => searchSys.filterList("pokemon")));

    createEffect(on(() => searchSys.searchingText.item,
                    () => searchSys.filterList("item")));

    return (
      <div class={SearchAreaStyle(searchType)}>
        <input class={(searchType == "pokemon")? PokemonSearchBoxStyle : SettingsSearchBoxStyle}
          value={
            (searchType == "pokemon")? searchSys.searchingText.pokemon : (
            (searchType == "item")? searchSys.searchingText.item :
            searchSys.searchingText.ability
          )}
          placeholder={placeholder}
          oninput={(e) => {if (searchType !== "none") searchSys.setSearchingText(searchType, e.currentTarget.value)}}
          onfocus={() => searchSys.setFocusedBox(searchType)}
          onfocusout={() => searchSys.setFocusedBox("none")}
        >
        </input>
        <Show when={searchSys.focusedBox() == searchType}>
          <ul class={DropStyle(searchType)}>
            <Switch>
              <Match when={searchType == "pokemon"}>
                <For each={searchSys.filteredPokemonList()}>
                  {(name) => (
                    <li class={ItemStyle} onmousedown={() => {searchSys.selectPokemon(name)}}>
                      {name}
                    </li>
                  )}
                </For>
              </Match>
              <Match when={searchType == "item"}>
                <For each={searchSys.filteredItemList()}>
                  {(item) => (
                    <li class={ItemStyle} onmousedown={() => {searchSys.selectItem(item)}}>
                      {item}
                    </li>
                  )}
                </For>
              </Match>
              <Match when={searchType == "ability"}>
                <For each={searchSys.filteredAbilityList()}>
                  {(item) => (
                    <li class={ItemStyle} onmousedown={() => {searchSys.selectAbility(item)}}>
                      {item}
                    </li>
                  )}
                </For>
              </Match>
            </Switch>
          </ul>
        </Show>
      </div>
    );
};

export default SearchBox;