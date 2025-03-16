import { type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { entrySys } from '../systems/Entry';


const MovesSectionStyle = css({
  // flex
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  flex: 2,
  // position
  // scale
  height: 100,
  boxSizing: 'border-box',
  // text
  // color
  // space
  gap: Size.space.xl,
  // other
});

const MoveStyle = css({
  // flex
  // position
  // scale
  height: Size.button.searchH,
  boxSizing: 'border-box',
  // text
  textAlign: 'center',
  // color
  backgroundColor: Colors.background,
  // space
  paddingLeft: Size.space.s,
  paddingRight: Size.space.s,
  // other
  border: "1px solid",
  borderColor: Colors.textLight,
  borderRadius: Size.radius.s,

});

const MovesSection: Component = () => {
    return (
      <div class={MovesSectionStyle}>
        <input class={MoveStyle}
               value={(entrySys.curFocused() >= 0)? entrySys.entryList[entrySys.curFocused()].moves[0] : ""}
               placeholder='move 1'
               oninput={(e) => entrySys.setFocusedMoves(0, e.currentTarget.value)}></input>
        <input class={MoveStyle}
               value={(entrySys.curFocused() >= 0)? entrySys.entryList[entrySys.curFocused()].moves[1] : ""}
               placeholder='move 2'
               oninput={(e) => entrySys.setFocusedMoves(1, e.currentTarget.value)}></input>
        <input class={MoveStyle}
               value={(entrySys.curFocused() >= 0)? entrySys.entryList[entrySys.curFocused()].moves[2] : ""}
               placeholder='move 3'
               oninput={(e) => entrySys.setFocusedMoves(2, e.currentTarget.value)}></input>
        <input class={MoveStyle}
               value={(entrySys.curFocused() >= 0)? entrySys.entryList[entrySys.curFocused()].moves[3] : ""}
               placeholder='move 4'
               oninput={(e) => entrySys.setFocusedMoves(3, e.currentTarget.value)}></input>
      </div>
    );
};

export default MovesSection;