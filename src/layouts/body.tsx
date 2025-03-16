import type { Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';

import EntrySection from './entrysection';
import MainSection from './mainSection';


const BodyStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  // position
  // scale
  // text
  letterSpacing: '1px',
  // color
  backgroundColor: Colors.background,
  color: Colors.textMain,
  // space
  padding: Size.space.m,
  // other
});

const Body: Component = () => {
    return (
      <div class={BodyStyle}>
        <EntrySection></EntrySection>
        <MainSection></MainSection>
      </div>
    );
};

export default Body;