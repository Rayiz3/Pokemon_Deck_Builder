import { type Component } from 'solid-js';
import { css } from '@emotion/css';

import { Colors } from '../property/Color';
import { Size, zIndex } from '../property/Size';
import { graphSys } from '../systems/Graph';



const TooltipStyle = css({
  // flex
  display: 'none',
  // position
  position: "absolute",
  zIndex: zIndex.popup,
  // scale
  // text
  fontSize: Size.fontSizes.xxs,
  color: Colors.background,
  // color
  backgroundColor: Colors.backgroundDark,
  // space
  padding: Size.space.xs,
  // other
  borderRadius: Size.radius.xs,
  pointerEvents: 'none',
});

const Tooltip: Component = () => {
    return (
      <div
        ref={(el) => (graphSys.tooltipDiv = el)}
        style={TooltipStyle}>
      </div>
    );
};

export default Tooltip;