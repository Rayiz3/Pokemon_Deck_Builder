import type { Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import SearchBox from '../components/searchBox';


const ItemAbilitySectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  // position
  // scale
  height: '100%',
  // text
  // color
  // space
  // other
});

const SettingStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  // position
  // scale
  // text
  fontSize: Size.fontSizes.s,
  textAlign: 'left',
  // color
  // space
  // other
});

const ItemAbilitySection: Component = () => {
    return (
      <div class={ItemAbilitySectionStyle}>
        <div class={SettingStyle}>
          <span style="min-width: 80px">Item</span>
          <SearchBox searchType='item' placeholder='search item ...'></SearchBox>
        </div>
        <div class={SettingStyle}>
          <span style="min-width: 80px">Ability</span>
          <SearchBox searchType='ability' placeholder='search ability ...'></SearchBox>
        </div>
      </div>
    );
};

export default ItemAbilitySection;