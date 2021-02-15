import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';
import { Title, useTheme } from 'react-native-paper';

import GetStyle from '../../../../core-feats/feat-native-utils/get-style-type';
import { GQLPhoto } from '../../../../feats/feat-graphql/graphqlTypes';
import LinkIcon from '../../../../icons/LinkIcon';

// ======================================================
// MODULE
// ======================================================
import styles from './PhotoSlider/SliderEntryStyle';


type SliderEntryProps = {
  data: GQLPhoto,
  even?: Boolean,
  parallax?: Boolean,
  parallaxProps?: AdditionalParallaxProps,
};
SliderEntryPhoto.defaultProps = {
  even: false,
  parallax: false,
  parallaxProps: undefined,
};
function SliderEntryPhoto(props: SliderEntryProps) {
  const {
    data: {
      url,
      title,
    },
    even,
    parallax,
    parallaxProps,
  } = props;

  const stylesApp = getStyles(useTheme());

  const renderImage = () => {
    return parallax
      ? (
        <ParallaxImage
          source={{ uri: url }}
          containerStyle={ [styles.imageContainer, even ? styles.imageContainerEven : {}] }
          style={ styles.image }
          parallaxFactor={ 0.35 }
          showSpinner={ true }
          spinnerColor={ even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)' }
          { ...parallaxProps }
        />
      )
      : (
        <Image
          source={{ uri: url }}
          style={ styles.image }
        />
      );
  };

  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={ styles.slideInnerContainer }
      // onPress={ () => { alert(`You've clicked '${title}'`); } }
    >
      {/*<View style={ styles.shadow } />*/}
      <View style={ [styles.imageContainer, even ? styles.imageContainerEven : {}] }>
        { renderImage() }
        {/*<View style={ [styles.radiusMask, even ? styles.radiusMaskEven : {}] } />*/}
      </View>


      {/*<View style={ [styles.textContainer, even ? styles.textContainerEven : {}] }>
        { uppercaseTitle }
         <Text
            style={ [styles.subtitle, even ? styles.subtitleEven : {}] }
            numberOfLines={ 2 }
          >
            { subtitle }
          </Text>
      </View>*/}

      <View style={ stylesApp.textContainer }>
        <Title style={ stylesApp.title }>
          { title }
        </Title>
        <View style={ stylesApp.linkContainer }>
          <Text style={ stylesApp.learMore }>
            Learn More
          </Text>
          <LinkIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(SliderEntryPhoto);

const getStyles : GetStyle = ({ spacing, colors }) => StyleSheet.create({
  textContainer: {
    marginTop: spacing.defaultMargin * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  learMore: {
    marginTop: spacing.defaultMargin * 2,
    marginRight: 10,
    color: colors.link,
    textAlign: 'center',
  },
});

