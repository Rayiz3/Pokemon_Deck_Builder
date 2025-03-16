import { createEffect, Show, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { dataSys } from '../systems/Data';
import PokemonImage from '../components/pokemonImage';
import Stats from '../components/stats';
import SearchBox from '../components/searchBox';
import { entrySys } from '../systems/Entry';
import Button from '../components/button';


const InfoSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  // position
  // scale
  minwidth: '50%',
  // text
  // color
  // space
  marginTop: Size.space.xs,
  marginLeft: Size.space.section,
  marginRight: Size.space.section,
  // other
});

const SearchSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  // position
  // scale
  width: '100%',
  // text
  // color
  // space
  gap: Size.space.s,
  // other
});

const AddToEntryButtonStyle = css({
  // flex
  flex: 1,
  // scale
  maxWidth: Size.button.searchW,
  minWidth: Size.button.searchW/2,
  height: Size.button.searchH,
  // text
  lineHeight: '30px',
  // color
  backgroundColor: Colors.background,
  // space
  boxSizing: "border-box",
  // other
  border: "2px solid",
  borderColor: Colors.textMain,
  borderRadius: Size.button.searchH/2,

  ':hover': {
    backgroundColor: Colors.backgroundHover,
  }
});

const InfoTypeStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  // position
  // scale
  // text
  // color
  // space
  gap: Size.space.s,
  // other
});

const InfoTypeBlockStyle = (typename: string) => {
  const color = dataSys.getTypeColorByName(typename);
  return css({
  // flex
  // position
  // scale
  ...(!typename && { width: 0 }),
  // text
  fontSize: Size.fontSizes.x3s,
  color: "#ffffff",
  // color
  backgroundColor: typename? color : 'none',
  // space
  padding: Size.space.xs,
  paddingLeft: Size.space.s,
  paddingRight: Size.space.s,
  // other
  borderRadius: Size.radius.s,
})};

const InfoHeadStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  // position
  // scale
  width: '100%',
  boxSizing: 'border-box',
  // text
  fontSize: Size.fontSizes.m,
  // color
  // space
  marginBottom: Size.space.l,
  // other
});

const MainNameStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.fontSizes.l,
  fontweight: 900,
  // color
  // space
  // other
})

const SubNameStyle = css({
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

const RatioStyle = css({
  // flex
  flex: 1,
  // position
  // scale
  // text
  fontSize: Size.fontSizes.m,
  fontweight: 900,
  textAlign: 'right',
  // color
  // space
  marginLeft: Size.space.s,
  // other
})

const InfoSection: Component = () => {
    return (
      <div class={InfoSectionStyle}>
        <div class={SearchSectionStyle}>
          <SearchBox searchType='pokemon' placeholder='search pokemon ...'></SearchBox>
          {/*<Button text="Add to Entry" stylecss={AddToEntryButtonStyle}></Button>*/}
        </div>
        <Show when={dataSys.curPokemonInfo.name != ""} fallback = {<div style="flex: 1;">choose pokemon to start!</div>}>
          <PokemonImage></PokemonImage>
          <div class={InfoTypeStyle}>
            <span class={InfoTypeBlockStyle(dataSys.curPokemonInfo.type1)}>{dataSys.curPokemonInfo.type1}</span>
            <span class={InfoTypeBlockStyle(dataSys.curPokemonInfo.type2)}>{dataSys.curPokemonInfo.type2}</span>
          </div>
          <div class={InfoHeadStyle}>
            <span class={MainNameStyle}>{dataSys.curPokemonInfo.name.split('_')[0]}</span>
            <span class={SubNameStyle}>{dataSys.curPokemonInfo.subname}</span>
            <span class={RatioStyle}>pick ratio {dataSys.formatFloat(dataSys.curPokemonInfo.pick)}%</span>
          </div>

          <Stats></Stats>
        </Show>
        
      </div>
    );
};

export default InfoSection;