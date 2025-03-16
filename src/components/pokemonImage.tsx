import { Show, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';

import { dataSys } from '../systems/Data';
import { entrySys } from '../systems/Entry';


const PokemonImageStyle = css({
  // flex
  // position
  // scale
  width: '300px',
  height: '300px',
  boxSizing: 'border-box',
  // text
  // color
  // space
  marginTop: Size.space.l,
  marginBottom: Size.space.l,
  // other
});

const PlaceHolderStyle = css({
  // flex
  // position
  // scale
  width: '300px',
  height: '300px',
  boxSizing: 'border-box',
  // text
  // color
  backgroundColor: Colors.backgroundHover
  // space
  // other
});

const PokemonImage: Component = () => {
    return (
      <img class={PokemonImageStyle}
        src={`/pokemon_images/${dataSys.curPokemonInfo.order}.png`}
        alt={`Image ${dataSys.curPokemonInfo.name}`}
      />
    );
};

export default PokemonImage;