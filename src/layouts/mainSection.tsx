import type { Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';

import GraphSection from './graphSection';
import InfoSection from './infoSection';
import SettingSection from './settingSection';
import TeamGraph from '../components/teamGraph';


const MainSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  // position
  // scale
  // text
  // color
  // space
  // other
  marginBottom: Size.space.l,
});

const InfoGraphSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  // position
  // scale
  // text
  // color
  // space
  marginBottom: Size.space.xxl,
  // other
});

const MainSection: Component = () => {
    return (
      <div class={MainSectionStyle}>
        <div class={InfoGraphSectionStyle}>
          <InfoSection></InfoSection>
          <TeamGraph></TeamGraph>
        </div>
        <SettingSection></SettingSection>
      </div>
    );
};

export default MainSection;