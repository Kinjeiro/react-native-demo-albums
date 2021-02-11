import { Platform, Dimensions } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

const windowDimensions = Dimensions.get('window');
export const viewportWidth = windowDimensions.width;
export const viewportHeight = windowDimensions.height;

export function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
