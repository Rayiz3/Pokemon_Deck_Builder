import { Accessor, Show, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { cardType, entrySys } from '../systems/Entry';
import PokemonCard from './pokemonCard';


const CardStyle = css({
  // flex
  display: 'flex',
  flex: 1,
  // position
  // scale
  width: '100%',
  minHeight: 100,
  // text
  // color
  backgroundColor: Colors.sub,
  // space
  marginTop: Size.space.xs,
  marginBottom: Size.space.xs,
  // other
  borderRadius: Size.radius.s,
});

const AddCardStyle = css({
  // flex
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // position
  // scale
  width: '100%',
  minHeight: 100,
  // text
  // color
  // space
  // other
  ':hover': {
    backgroundColor: Colors.subHover,
    borderRadius: Size.radius.s,
    cursor: "pointer",
  }
});

const Card: Component<{index?: Accessor<number>, cardType: cardType}> = ({index, cardType}) => {
    return (
      <div class={CardStyle}>
        <Show when={cardType == "pokemon"} fallback={
          <Show when={cardType == "add"}>
            <div class={AddCardStyle} onClick={() => entrySys.addPokemon("")}>
              Add
            </div>
          </Show>
        }>
          <PokemonCard index={index as Accessor<number>}></PokemonCard>
        </Show>
      </div>
    );
};

export default Card;