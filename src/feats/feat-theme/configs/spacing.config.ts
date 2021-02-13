import { widthPercentToPx } from '../../feat-utils/native-utils';

export interface ThemeSpacing {
  defaultMargin: number,
  formFieldMarginHorizontal: number,
}

export const DEFAULT_MARGIN = widthPercentToPx(3.8); // 16px на 414px ширине

const themeSpacing : ThemeSpacing = {
  defaultMargin: DEFAULT_MARGIN,
  formFieldMarginHorizontal: DEFAULT_MARGIN * 2,
};

export default themeSpacing;
