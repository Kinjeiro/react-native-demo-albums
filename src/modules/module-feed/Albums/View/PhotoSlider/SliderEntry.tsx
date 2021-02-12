import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';

import styles from './SliderEntryStyle';

type SliderEntryProps = {
  data: Object,
  even?: Boolean,
  parallax?: Boolean,
  parallaxProps?: Object,
};
export default function SliderEntry(props: SliderEntryProps) {
  const {
    data: {
      url,
      title,
    },
    even,
    parallax,
    parallaxProps,
  } = props;

  const renderImage = () => {
    //const {
    //  data: { url }, parallax, parallaxProps, even,
    //} = props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: url }}
        containerStyle={ [styles.imageContainer, even ? styles.imageContainerEven : {}] }
        style={ styles.image }
        parallaxFactor={ 0.35 }
        showSpinner={ true }
        spinnerColor={ even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)' }
        { ...parallaxProps }
      />
    ) : (
      <Image
        source={{ uri: url }}
        style={ styles.image }
      />
    );
  };

  const uppercaseTitle = title ? (
    <Text
      style={ [styles.title, even ? styles.titleEven : {}] }
      numberOfLines={ 2 }
    >
      { title.toUpperCase() }
    </Text>
  ) : false;

  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={ styles.slideInnerContainer }
      // onPress={ () => { alert(`You've clicked '${title}'`); } }
    >
      <View style={ styles.shadow } />
      <View style={ [styles.imageContainer, even ? styles.imageContainerEven : {}] }>
        { renderImage() }
        <View style={ [styles.radiusMask, even ? styles.radiusMaskEven : {}] } />
      </View>
      <View style={ [styles.textContainer, even ? styles.textContainerEven : {}] }>
        { uppercaseTitle }
        {/* <Text
            style={ [styles.subtitle, even ? styles.subtitleEven : {}] }
            numberOfLines={ 2 }
          >
            { subtitle }
          </Text> */}
      </View>
    </TouchableOpacity>
  );
}
