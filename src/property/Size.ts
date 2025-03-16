  // flex
  // position
  // scale
  // text
  // color
  // space
  // other

export const zIndex = {
    dropdown: 10,
    contentOverlay: 20,
    header: 50,
    mainOverlay: 55,
    popup: 1300
  }
  
export const Size = {
  lineHeight: {
    header: '70px',
    body: '1.5em'
  },
  fontSizes: { // 1rem = 16px
    x3s: '0.8rem', // 0.8 * 16 = 12.8px
    xxs: '1.0rem', // 1.0 * 16 = 16.0px
    xs: '1.2rem', // 1.2 * 16 = 17.6px
    s: '1.4rem', // 1.4 * 16 = 22.4px
    m: '1.6rem', // 1.6 * 16 = 25.6px
    l: '2.0rem', // 2.0 * 16 = 32.0px
    xl: '2.4rem', // 2.4 * 16 = 38.4px
    xxl: '3.2rem' // 3.2 * 16 = 51.2px
  },
  fontWeight: {
    normal: 500,
    semiBold: 600,
    bold: 800
  },
  space: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
    section: 40,
    main: 80
  },
  radius: {
    xs: 4,
    s: 8,
    m: 15,
    l: 20,
    xl: 24,
    circle: 100
  },
  button: {
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 88,
    select: 20,
    account: 36,
    outlined: { w: 400, h: 76 },
    long: 350,
    searchH: 36,
    searchW: 300,
    tera: 36,
    item: 24,
  },

  thickness: {
    sm: 1,
    md: 2,
    lg: 4,
    xl: 6
  },
  transition: {
    fast: '0.5s ease',
    medium: '1.0s ease',
    slow: '1.2s ease'
  },
  opacity: {
    sm: 0.3,
    md: 0.5,
    lg: 0.7
  },
  brightness: {
    md: 1.5,
    lg: 2
  },
  select: { w: 130, h: 40 },
  popover: { w: 180 },
  video: { w: 1240, h: 698 },
  boxItem: { w: 245, h: 280 },
  vocalItem: {
    desktop: { w: 280, h: 280 },
    mobile: { w: 168, h: 168 }
  },
  vocalContent: {
    desktop: { w: 960, h: 720 },
    mobile: { w: 150, h: 200 }
  },
  content: {
    desktop: { w: 960, mw: 1240, pd: 170 },
    mobile: { w: 342, pd: 40 }
  },
  mockup: { desktop: 616, mobile: 330 },
  voxGradient: { desktop: 396, mobile: 220 },
  factoryGradient: { desktop: 396, mobile: 230 },
  footer: { desktop: 160, mobile: 330 },
  helpButton: { desktop: 50, mobile: 70 },
  help: { desktop: 1240, mobile: 320 }
}

export const breakpoints = {
  mobile: 0,
  studio: 880,
  desktop: Size.content.desktop.mw
}

export const devices = {
  mobile: `screen and (min-width: ${breakpoints.mobile}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`
}