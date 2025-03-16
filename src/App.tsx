import { onMount, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from './property/Color';

import Body from './layouts/body';
import Head from './layouts/head';
import { dataSys } from './systems/Data';
import { searchSys } from './systems/Search';
import { recommandSys } from './systems/Recommand';
import { graphSys } from './systems/Graph';


const AppStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  // scale
  width: '100vw',
  height: '100vh',
  // text
  textAlign: 'center',
  fontWeight: 'lighter',
  // color
  backgroundColor: Colors.background,
  color: Colors.textMain,
});

const App: Component = () => {
  onMount(async () => {
    await dataSys.initialize();
    await searchSys.initialize();
    graphSys.initialize();
  });

  return (
    <div class={AppStyle}>
      <Head></Head>
      <Body></Body>
    </div>
  );
};

export default App;
