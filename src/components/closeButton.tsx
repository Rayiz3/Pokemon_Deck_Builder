import { Accessor, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { entrySys } from '../systems/Entry';


const CloseButtonStyle = css({
  // flex
  // position
  // scale
  width: '16px',
  height: '16px',
  boxSizing: 'border-box',
  // text
  // color
  // space
  // other
  ":hover": {
    fontWeight: "bold",
    cursor: "pointer"
  }
});

const CloseButton: Component<{index: Accessor<number>}> = ({index}) => {
    return (
      <div class={CloseButtonStyle} onmousedown={() => entrySys.removePokemon(index())}>
            ⨉
      </div>
    );
};

export default CloseButton;