import { Accessor, Show, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { entrySys } from '../systems/Entry';
import CloseButton from './closeButton';
import { dataSys } from '../systems/Data';
import { searchSys } from '../systems/Search';


const PokemonCardStyle = (index: number, pokemon: string) => { return css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  // position
  // scale
  width: '100%',
  boxSizing: 'border-box',
  // text
  // color
  background: `
    url(/pokemon_images/${dataSys.pokemonInfo.find(singleInfo => singleInfo.name === pokemon)?.order}.png) no-repeat center center,
    ${Colors.sub}`,
  // space
  padding: Size.space.s,
  // other
  outline: (entrySys.curFocused() == index)? "solid 2px" : 'none',
  outlineColor: (entrySys.curFocused() == index)? Colors.main : 'none',
  borderRadius: Size.radius.s,
  
  backgroundSize: "60%", // Shrinks the image to 150% of its natural size
  backgroundPosition: "right 20%", // Keeps the image centered
  overflow: "hidden",
  filter: "opacity(0.6)", // Adjust the opacity of the imageslightly for zoom effect
})};

const PokemonSettingsStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flex: '1',
  // position
  // scale
  height: '100%',
  // text
  // color
  // space
  paddingLeft: Size.space.xxs,
  // other
})

const PokemonMovesStyle = css({
  // flex
  display: 'grid',
  gridTemplateColumns: "repeat(2, 1fr)",
  flex: '1',
  // position
  // scale
  height: '100%',
  // text
  lineHeight: 3,
  // color
  // space
  paddingLeft: Size.space.xxs,
  // other
})

const PokemonAbilityItemStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  // position
  // scale
  // text
  lineHeight: Size.lineHeight.body,
  fontSize: '14px',
  // color
  // space
  // other
})

const PokemonNameStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  // position
  // scale
  // text
  // color
  // space
  marginBottom: Size.space.xs,
  // other
})

const PokemonMainNameStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.fontSizes.m,
  fontweight: 900,
  // color
  // space
  // other
})

const PokemonSubNameStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.fontSizes.xxs,
  fontweight: 900,
  // color
  // space
  marginLeft: Size.space.s,
  // other
})

const ItemImageStyle = css({
  // flex
  // position
  alignSelf: 'self-end',
  // scale
  width: Size.button.item,
  height: Size.button.item,
  // text
  // color
  // space
  marginLeft: Size.space.s,
  // other
})

const TeraImageStyle = css({
  // flex
  // position
  // scale
  width: Size.button.tera,
  height: Size.button.tera,
  // text
  // color
  // space
  // other
})

const PokemonCard: Component<{index: Accessor<number>}> = ({index}) => {
  return (
    <div class={PokemonCardStyle(index(), entrySys.entryList[index()]?.name)}
          tabindex={index()+1}
          onfocus={() => {
            entrySys.setCurFocused(index());
            dataSys.getPokemonInfo(entrySys.entryList[index()].name);
            searchSys.selectPokemon(entrySys.entryList[index()].name);
          }}>
          <Show when={entrySys.isMoves()} fallback={
            <div class={PokemonSettingsStyle}>
              <div class={PokemonAbilityItemStyle}>
                <div style="display: flex; flex-direction: row">
                  <span>{entrySys.entryList[index()].item.name}</span>
                  <Show when={entrySys.entryList[index()].item.index}>
                    <img class={ItemImageStyle}
                        src={`/pokemon_items/${entrySys.entryList[index()].item.index}.png`}></img>
                  </Show>
                </div>
                <span>{entrySys.entryList[index()].ability}</span>
              </div>

              <div class={PokemonNameStyle}>
                <span class={PokemonMainNameStyle}>{entrySys.entryList[index()]?.name.split("_")[0]}</span>
                <span class={PokemonSubNameStyle}>{entrySys.entryList[index()]?.subname}</span>

                <Show when={entrySys.entryList[index()].tera.name}>
                  <img class={TeraImageStyle}
                      src={`/pokemon_types/${entrySys.entryList[index()].tera.index}.png`}
                      alt={entrySys.entryList[index()].tera.name}>
                  </img>
                </Show>
              </div>
            </div>
          }>
            <div class={PokemonMovesStyle}>
              <div>{entrySys.entryList[index()].moves[0]}</div>
              <div>{entrySys.entryList[index()].moves[1]}</div>
              <div>{entrySys.entryList[index()].moves[2]}</div>
              <div>{entrySys.entryList[index()].moves[3]}</div>
            </div>
          </Show>
          <CloseButton index={index}></CloseButton>
    </div>
  );
};

export default PokemonCard;