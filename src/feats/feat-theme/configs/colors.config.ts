declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      errorBackground: string,
      error: string,
      link: string,

      formEditLabel: string,
      formViewLabel: string,
      formViewReadonly: string,

      listItemShadow: string,
      listItemDelimiter: string,
    }
  }
}

/*
  primary - primary color for your app, usually your brand color.
  accent - secondary color for your app which complements the primary color.
  background - background color for pages, such as lists.
  surface - background color for elements containing content, such as cards.
  text - text color for content.
  disabled - color for disabled elements.
  placeholder - color for placeholder text, such as input placeholder.
  backdrop - color for backdrops of various components such as modals.
*/
const colors : Partial<ReactNativePaper.ThemeColors> = {
  /*
  text \ active tab - 404040

  active bottom icon - #4E42E4;

  passive - #AFAFAF;

  button background - #F54747
  button text - FFFFFF

  button back - #4E42E4
  button text - FFFFFF

  from input label - AFAFAF

  link - 1D63CB

  form view text - text
  form view readonly - A8ACAF
 */
  primary: '#4E42E4',
  //accent: 'orange',
  background: '#fff',
  //surface: 'yellow',
  text: '#404040',
  disabled: '#AFAFAF',
  placeholder: '#AFAFAF',
  //backdrop: 'blue',


  // ======================================================
  // CUSTOM
  // ======================================================
  //textInactive: '#AFAFAF',
  errorBackground: '#F54747',
  error: '#fff',
  link: '#1D63CB',

  formEditLabel: '#AFAFAF',
  formViewLabel: '#404040',
  formViewReadonly: '#A8ACAF',

  //listItemShadow: '#F2F2F2',
  listItemShadow: '#F2F2F2',
  listItemDelimiter: '#C1C1C1',
};

export default colors;
