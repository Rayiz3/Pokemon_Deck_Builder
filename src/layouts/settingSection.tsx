import { Show, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import ItemAbilitySection from './itemAbilitySection';
import TeraTypeSection from './teraTypeSection';
import MovesSection from './movesSection';
import { dataSys } from '../systems/Data';
import { entrySys } from '../systems/Entry';
import Button from '../components/button';


const SettingSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  // position
  // scale
  height: 100,
  boxSizing: 'border-box',
  // text
  // color
  // space
  gap: Size.space.xl,
  marginLeft: Size.space.section,
  // other
});

const AddToEntryButtonsStyle = css({
  // flex
  alignSelf: 'center',
  // position
  // scale
  width: "20%",
  minWidth: 100,
  height: Size.button.searchH,
  // text,
  textAlign: 'center',
  lineHeight: '30px',
  color: Colors.background,
  // color
  backgroundColor: Colors.main,
  // space
  padding: Size.space.l,
  // other
  borderRadius: Size.radius.s,
  ":hover": {
    backgroundColor: Colors.mainDark,
    cursor: "pointer",
  }
});

const SettingSection: Component = () => {
    return (
      <div class={SettingSectionStyle}>
        <Show when={(entrySys.curFocused() >= 0) && (dataSys.curPokemonInfo.name)} fallback={
          <Show when={dataSys.curPokemonInfo.name != ""}>
            <Button text="Add to Entry" stylecss={AddToEntryButtonsStyle} func={() => entrySys.addPokemon(dataSys.curPokemonInfo.name)}></Button>
          </Show>
        }>
          <ItemAbilitySection></ItemAbilitySection>
          <TeraTypeSection></TeraTypeSection>
          <MovesSection></MovesSection>
        </Show>
      </div>
    );
};

export default SettingSection;