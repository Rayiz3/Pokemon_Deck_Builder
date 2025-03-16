import { Accessor, Match, Show, Switch, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { dataSys } from '../systems/Data';

const StatStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // position
  // scale
  width: '100%',
  height: '24px',
  // text
  // color
  // space
  // other
});

const LabelStyle = css({
  // flex
  // position
  // scale
  width: '36px',
  // text
  textAlign: 'left',
  // color
  // space
  // other
});

const AbbStyle = css({
  // flex
  // position
  // scale
  width: '40px',
  // text
  textAlign: 'left',
  // color
  // space
  // other
});

const ValueStyle = css({
  // flex
  // position
  // scale
  width: '48px',
  // text
  textAlign: 'left',
  // color
  // space
  // other
});

const BarStyle = (value: number) => { return css({
    // flex
    // position
    // scale
    width: `calc(${value * 0.4}%)`,
    height: '10px',
    // text
    // color
    backgroundColor: Colors.sub,
    // space
    // other
    borderRadius: '5px',
    transition: 'width 0.5s ease',
  })
}

const StatsStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: '1',
  // position
  // scale
  width: '100%',
  // text
  // color
  // space
  marginTop: Size.space.m,
  marginBottom: Size.space.m,
  // other
});

const Stat: Component<{field: string, abb: string}> = ({field, abb}) => {
    return (
      <div class={StatStyle}>
        <p class={LabelStyle}>{field}</p>
        <p class={AbbStyle}>({abb})</p>
        <Switch>
          <Match when={ field == 'HP' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.H}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.H)}></div>
          </Match>
          <Match when={ field == 'Att.' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.A}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.A)}></div>
          </Match>
          <Match when={ field == 'Def.' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.B}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.B)}></div>
          </Match>
          <Match when={ field == 'SpA.' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.C}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.C)}></div>
          </Match>
          <Match when={ field == 'SpD.' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.D}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.D)}></div>
          </Match>
          <Match when={ field == 'Spe.' }>
            <p class={ValueStyle}>{dataSys.curPokemonInfo.S}</p>
            <div class={BarStyle(dataSys.curPokemonInfo.S)}></div>
          </Match>
        </Switch>
      </div>
      
    );
};

const Stats: Component = () => {
  return (
    <div class={StatsStyle}>
      <Stat field='HP' abb='H'></Stat>
      <Stat field='Att.' abb='A'></Stat>
      <Stat field='Def.' abb='B'></Stat>
      <Stat field='SpA.' abb='C'></Stat>
      <Stat field='SpD.' abb='D'></Stat>
      <Stat field='Spe.' abb='S'></Stat>
    </div>
  );
};

export default Stats;