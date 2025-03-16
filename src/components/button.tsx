import { Accessor, type Component } from 'solid-js';
import { css } from '@emotion/css';

import { Colors } from '../property/Color';
import { Size } from '../property/Size';


const DefaultButtonsStyle = css({
  // flex
  flex: 1,
  // position
  // scale
  minHeight: Size.button.searchH,
  // text,
  lineHeight: '30px',
  // color
  backgroundColor: Colors.backgroundDark,
  // space
  padding: Size.space.s,
  // other
  borderRadius: Size.radius.s,
  ":hover": {
    backgroundColor: Colors.backgroundDarkHover,
    cursor: "pointer",
  }
});

const Button: Component<{text: string | Accessor<string>, stylecss?: string, func?: () => void}> = ({text, stylecss, func}) => {
    return (
      <div class={stylecss? stylecss : DefaultButtonsStyle}
           onclick={func}>
        {(typeof text == 'string')? text : text()}
      </div>
    );
};

export default Button;