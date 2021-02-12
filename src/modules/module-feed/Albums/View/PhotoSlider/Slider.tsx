import React, { useRef, useState } from 'react';
import {
  View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { sliderWidth, itemWidth } from './SliderEntryStyle';
import SliderEntry from './SliderEntry';
import styles from './index-style';

const SLIDER_1_FIRST_ITEM = 1;

type SliderProps = {
  data: ReadonlyArray<any>,
};

export default function Slider(props: SliderProps) {
  const {
    data,
  } = props;
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(SLIDER_1_FIRST_ITEM);
  const sliderRef = useRef(null);

  const renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={ item }
        even={ (index + 1) % 2 === 0 }
        parallax={ true }
        parallaxProps={ parallaxProps }
      />
    );
  };

  return (
    <SafeAreaView style={ styles.safeArea }>
      <View style={ styles.container }>
        <StatusBar
          translucent={ true }
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
        />
        {/* { this.gradient } */}
        <ScrollView
          style={ styles.scrollview }
          scrollEventThrottle={ 200 }
          directionalLockEnabled={ true }
        >
          <View style={ styles.exampleContainer }>
            {/* <Text style={ styles.title }>{`Example ${number}`}</Text>
        <Text style={ styles.subtitle }>{title}</Text> */}
            <Carousel
              ref={ sliderRef }
              data={ data }
              renderItem={ renderItemWithParallax }
              sliderWidth={ sliderWidth }
              itemWidth={ itemWidth }
              hasParallaxImages={ true }
              firstItem={ SLIDER_1_FIRST_ITEM }
              inactiveSlideScale={ 0.94 }
              inactiveSlideOpacity={ 0.7 }
              // inactiveSlideShift={20}
              containerCustomStyle={ styles.slider }
              contentContainerCustomStyle={ styles.sliderContentContainer }
              loop={ true }
              loopClonesPerSide={ 2 }
              // autoplay={ true }
              // autoplayDelay={ 500 }
              // autoplayInterval={ 3000 }
              onSnapToItem={ setSlider1ActiveSlide }
            />
            {/* <Pagination
              dotsLength={ data.length }
              activeDotIndex={ slider1ActiveSlide }
              containerStyle={ styles.paginationContainer }
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={ styles.paginationDot }
              inactiveDotColor={ colors.black }
              inactiveDotOpacity={ 0.4 }
              inactiveDotScale={ 0.6 }
              carouselRef={ sliderRef.current }
              tappableDots={ !!sliderRef.current }
            /> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
