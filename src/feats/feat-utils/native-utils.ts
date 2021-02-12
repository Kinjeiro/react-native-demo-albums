import { Platform, Dimensions } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_WEB = Platform.OS === 'web';

const windowDimensions = Dimensions.get('window');
export const viewportWidth = windowDimensions.width;
export const viewportHeight = windowDimensions.height;

export function widthPercentToPx(percentage: number) {
  return Math.round((percentage * viewportWidth) / 100);
}
export function heightPercentToPx(percentage: number) {
  return Math.round((percentage * viewportHeight) / 100);
}
