const colors = {
  brandGreen: '#00A348',
  brandRed: '#CF4128',
  brandPurple: '#6156BD',
  brandOrange: '#FFAF14',
  brandGothic: '#688288',
  brandBlue: '#00B4C4',
  colorTorched: '#fe1e28',

  colorAthensGrey: '#FBFBFC',
  colorAlabaster: '#F7F7F7',
  colorAthensGreyLight: '#EAEAEF',
  coloralToLight: '#DEDEDE',
  coloralTo: '#D1D1D1',
  colorNobel: '#B3B3B3',
  colorGunSmoke: '#858B88',
  colorTuna: '#313339',
  colorLogCabin: '#121712',
  colorMischka: '#CED0D',

  colorSaltPan: '#F5FAF6',
  colorTara: '#DBF3E6',
  colorFringyFlower: '#B6E5C1',
  colorSilverTree: '#5EBF8A',
  colorFunGreen: '#008148',
  colorTeaPapaGreen: '#203F40',

  colorLynch: '#62738D', // bluegrey
  colorBaliHai: '#8897AA',
  colorGhost: '#C3CBD5', // bluegreylight
  colorGeyser: '#dee4e9',
  colorPorcelain: '#F5F8F7',

  purpleAthensGreyLightest: '#F3F5F7', // bluelightest
  colorSelago: '#fafafe',
  colorWhiteLilac: '#fbfbfe',
  blueGreyLightest: '#F3F5F7',
  colorBlueBayoux: '#51617A', // bluegreydark
  colorFiord: '#3e4d65', // bluegreydarker
  colorChampagne: '#FAF2CC',
  colorOysterPink: '#EBCCCC',
  colorMustard: '#ffd74f',
  colorNeonCarrot: '#ff9933',
  colorGullGray: '#99A5B8',

  homeLoans: '#38bcbb',
  personalLoans: '#7c5cac',
  carLoans: '#f25c55',
  creditCards: '#3399ff',
  superannuation: '#15429c',
  investment: '#66cc99',
  banking: '#ff9933',
  calculators: '#ffd966',

  homeLoansBanner: '#008A90',
  personalLoansBanner: '#674383',
  carLoansBanner: '#CA5153',
  creditCardsBanner: '#428FCD',
  superannuationBanner: '#4e66ac',
  homePageBanner: '#51617a',

  twitter: '#55bfdc',
  facebook: '#314e89',
  google: '#b1312b',
  linkedin: '#55a2c0',
  vimeo: '#1ab7ea',

  white: '#fff',

  supermanRed: '#fb1e26',
  columbus: '#62738E',

  stressgreen: '#a6db31',
  stressyellow: '#fbd556',
  stressred: '#fc1618',

  opaque: `rgba(125, 125, 125, 0.12)`,
  opaqueDark: `rgba(18, 23, 18, 0.12)`,
}

module.exports = Object.assign(colors, {
  bannerBackground: colors.colorTorched,
  colorGreenHaze: colors.brandGreen,

  blue: colors.brandBlue,
  red: colors.brandRed,
  orange: colors.brandOrange,
  purple: colors.brandPurple,
  gothic: colors.brandGothic,

  termDeposits: colors.investment,

  black: colors.colorLogCabin,

  brandPrimary: colors.colorLynch,
  brandSuccess: colors.brandGreen,
  brandInfo: colors.purple,
  brandWarning: colors.orange,
  brandDanger: `darken(${colors.orange}, 5%)`,

  grayBase: colors.colorLogCabin,
  grayDarker: colors.colorTuna,
  grayDark: colors.colorGunSmoke,
  gray: colors.colorNobel,
  grayMid: colors.colorAthensGreyLight,
  grayLight: colors.colorAlabaster,
  grayLighter: colors.colorAthensGrey,

  textColor: colors.gray,
  linkColor: colors.colorLynch,

  unicaReg:
      '"Neue Haas Unica W01 Regular", applesystem, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sansserif',
  unicaMed:
      '"Neue Haas Unica W01 Medium It", applesystem, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sansserif',
  unicaBold:
      '"Neue Haas Unica W01 Bold", applesystem, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sansserif',
  unicaHeavy:
      '"Neue Haas Unica W01 Heavy", applesystem, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sansserif',
  unicaRegItalic:
      '"Neue Haas Unica W01 Hea1492559", applesystem, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sansserif',

  fontSizeH1: '28px',
  fontSizeH2: '24px',
  fontSizeH3: '20px',
  fontSizeH4: '18px',
  fontSizeH5: '16px',
  fontSizeH6: '11px',

  lineHeightBase: 1.2,
  lineHeightComputed: '24px',

  headingsFontWeight: 'bold',
  headingsLineHeight: 1.4,
  headingsColor: colors.grayDarker,

  formFontSize: '15px',
  formLineHeight: 1.4,
  formBorderRadius: '2px',
  formFontWeight: 400,
  formBorderColor: colors.colorAthensGreyLight,
  formTextColor: colors.colorTuna,
  formPlaceholderColor: colors.colorNobel,
  formBoxShadow: 'none',
  formBoxShadowHover: '0px 0px 5px 0px rgba(18,23,18,0.06)',
  formHeight: '45px',
  formLabelColor: '#4c4c4c',
  formControlHeight: '50px',

  caretWidthBase: '4px',

  tableBorderColor: colors.colorAthensGreyLight,

  btnDefaultColor: colors.gray,
  btnDefaultBG: colors.graylight,
  btnDefaultBorder: colors.graylight,

  btnPrimaryBG: colors.colorLynch,
  btnPrimaryBorder: colors.btnPrimaryBG,

  btnSuccessBG: colors.brandGreen,
  btnSuccessBorder: colors.brandGreen,

  btnInfoBG: colors.purple,
  btnInfoBorder: colors.purple,

  btnWarningBG: colors.orange,
  btnWarningBorder: colors.orange,

  btnDangerBG: `darken(${colors.orange}, 5%)`,
  btnDangerBorder: `darken(${colors.orange}, 5%)`,

  inputborder: colors.opaque,
  inputborderfocus: colors.grayLight,

  dropDownBG: colors.grayLighter,
  dropDownBorder: 'transparent',
  dropDownFallbackBorder: colors.grayLighter,
  dropDownDividerBG: colors.opaque,

  navbarHeight: '70px',

  navbardefaultbg: '#fff',
  navbardefaultborder: 'transparent',

  navbarDefaultLinkHovercolor: colors.colorTuna,
  navbarDefaultLinkHoverbg: colors.colorAthensGrey,
  navbarDefaultLinkActiveColor: colors.black,
  navbarDefaultLinkActiveBG: 'transparent',

  navLinkHoverBG: 'transparent',

  navTabsBorderColor: colors.grayLight,
  navTabsLinkHoverBorderColor: 'transparent',
  navTabsActiveLinkHoverBG: colors.white,

  paginationColor: colors.gray,
  paginationBG: colors.opaque,
  paginationBorder: colors.grayLight,

  paginationHoverColor: colors.colorLynch,
  paginationHoverBG: `darken(${colors.grayLight}, 5%)`,
  paginationHoverBorder: colors.grayLight,

  paginationActiveBorder: colors.grayLight,

  paginationDisabledColor: colors.grayLight,
  paginationDisabledBG: colors.grayLight,
  paginationDisabledBorder: colors.grayLight,

  labelDefaultBG: colors.opaqueDark,
  labelColor: colors.gray,

  alertSuccessBG: colors.colorLynch,
  alertSuccessText: colors.white,
  alertSuccessBorder: colors.colorLynch,

  alertInfoBG: colors.purple,
  alertInfoText: colors.white,
  alertInfoBorder: colors.purple,

  alertWarningBG: colors.orange,
  alertWarningText: colors.white,
  alertWarningBorder: colors.orange,

  listGroupBG: colors.grayLight,
  listGroupBorder: colors.opaque,
  listGroupBorderRadius: 0,

  listGroupLinkColor: colors.colorLynch,
  listGroupLinkHoverColor: colors.colorBlueBayoux,

  panelBG: colors.grayLight,
  panelBodyPadding: '20px',
  panelHeadingPadding: '15px 10px',
  panelBorderRadius: 0,

  panelInnerBorder: colors.opaque,
  panelDefaultBorder: colors.opaque,

  wellBG: colors.grayLight,
  wellBorder: 'transparent',

  badgeColor: colors.gray,
  badgeBG: colors.opaque,
  badgePromotedBG: '#6e6e6e',

  badgeFontWeight: 'normal',

  breadCrumbBG: colors.white,
  breadCrumbColor: colors.grayLight,
  breadCrumbActiveColor: `darken(${colors.grayLight}, 15%) !default`,
  breadCrumbSeparator: `"|" !default`,

  gotoSite: colors.colorNeonCarrot,
})
