import type { Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';


const HeadStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  // position
  // scale
  height: Size.lineHeight.header,
  // text
  fontFamily: "'Jaro', sans-serif",
  lineHeight: Size.lineHeight.header,
  textAlign: 'center',
  fontSize: Size.fontSizes.m,
  fontWeight: 'lighter',
  letterSpacing: '3px',
  // color
  backgroundColor: Colors.main,
  color: Colors.textMain,
  // space
  padding: Size.space.m,
  // other
});

const Head: Component = () => {
    return (
      <div class={HeadStyle}>
        Pokémon Deck builder
      </div>
    );
};

export default Head;