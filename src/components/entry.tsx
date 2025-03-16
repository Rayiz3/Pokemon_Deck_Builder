import { For, Show, type Component } from 'solid-js';
import { css } from '@emotion/css';

import { Colors } from '../property/Color';
import { Size } from '../property/Size';

import { entrySys } from '../systems/Entry';
import Card from './card';


const EntryStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  // position
  // scale
  width: '100%',
  // text
  fontSize: Size.fontSizes.xxs,
  // color
  backgroundColor: Colors.background,
  // space
  // other
});

const Entry: Component = () => {
    return (
      <div class={EntryStyle}>
        <For each={entrySys.entryList}>{(pokemon, i) =>
          <Card index={i} cardType='pokemon'></Card>
        }</For>

        <Show when={entrySys.entryList.length < 6}>

          <Card cardType='add'></Card>

          <For each={Array.from({ length: 6 - entrySys.entryList.length - 1 })}>{(_, i) =>
            <Card cardType='empty'></Card>
          }</For>

        </Show>

      </div>
    );
};

export default Entry;