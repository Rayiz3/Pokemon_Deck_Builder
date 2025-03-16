import type { Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import TeamGraph from '../components/teamGraph';


const GraphSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  // position
  // scale
  // text
  // color
  backgroundColor: Colors.backgroundHover,
  // space
  // other
  borderRadius: Size.radius.m,
});

const GraphSection: Component = () => {
    return (
      <div class={GraphSectionStyle}>
        <TeamGraph></TeamGraph>
      </div>
    );
};

export default GraphSection;