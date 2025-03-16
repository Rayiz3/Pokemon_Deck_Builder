import { createEffect, on, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import Entry from '../components/entry';
import EntryButtons from '../components/button';
import Button from '../components/button';
import { entrySys } from '../systems/Entry';
import { recommandSys } from '../systems/Recommand';


const EntrySectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  // position
  // scale
  width: '24vw',
  minWidth: '300px',
  // text
  // color
  // space
  // other
});

const EntryButtonsStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  // position
  // scale
  // text
  // color
  // space
  gap: Size.space.s,
  marginTop: Size.space.s,
  // other
});

const EntrySection: Component = () => {
  createEffect(on(entrySys.isMoves, () => {
    entrySys.setMoveButMessage(entrySys.isMoves()? "Back to Setting" : "See Moves");
  }));
    return (
      <div class={EntrySectionStyle}>
        <Entry></Entry>
        <div class={EntryButtonsStyle}>
          <Button text="Recommand" func={() => recommandSys.run()}></Button>
          <Button text={entrySys.moveButMessage} func={() => entrySys.setIsMoves(!entrySys.isMoves())}></Button>
        </div>
      </div>
    );
};

export default EntrySection;