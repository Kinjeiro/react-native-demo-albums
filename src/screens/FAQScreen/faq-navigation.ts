enum FAQScreens {
  FAQ_BlocksBLOCKS = 'FAQBlocks',
  FAQ_BLOCK = 'FAQBlock',
}

export default FAQScreens;

/*
 initialRouteName,
  children,
  screenOptions
 */
export type FAQNavigatorParamList = {
  [FAQScreens.FAQ_BlocksBLOCKS]: undefined,
  [FAQScreens.FAQ_BLOCK]: {
    blockId: string,
    blockTitle: string,
  },
};
