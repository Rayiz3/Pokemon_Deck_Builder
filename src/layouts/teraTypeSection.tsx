import { For, type Component } from 'solid-js';
import { css } from '@emotion/css';
import { Colors } from '../property/Color';
import { Size } from '../property/Size';
import { dataSys } from '../systems/Data';
import { entrySys } from '../systems/Entry';


const TeraTypeSectionStyle = css({
  // flex
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  // position
  // scale
  height: '100%',
  // text
  fontSize: Size.fontSizes.s,
  textAlign: 'left',
  // color
  // space
  // other
});

const GridContainerStyle = css({
  // flex
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  // position
  // scale
  // text
  // color
  // space
  // other
});

const IconStyle = css({
  // flex
  // position
  // scale
  width: Size.button.tera,
  height: Size.button.tera,
  // text
  // color
  // space
  // other
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  opacity: '0.3',
  ":hover": {
    opacity: '0.8',
  },
});

const HighlightedStyle = css({
  opacity: '1.0',
  filter: "contrast(1.2)",
});

const TeraTypeSection: Component = () => {
    return (
      <div class={TeraTypeSectionStyle}>
        <span style="min-width: 60px">Tera</span>
        <div class={GridContainerStyle}>
          <For each={Array.from({length: 19})}>{(_, i) =>
            <img class={`${IconStyle} ${dataSys.selectedType() == i()+1 ? HighlightedStyle : ""}`}
              src={`/pokemon_types/${i()+1}.png`}
              alt={`type-${i()+1}`}
              onclick={() => entrySys.setFocusedTypeInfo(i()+1)} // Set clicked index as selected
            />
          }</For>
        </div>
      </div>
    );
};

export default TeraTypeSection;