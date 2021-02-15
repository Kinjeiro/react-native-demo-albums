import React, { useRef } from 'react';
import {
  View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native';
import Carousel, { CarouselProps } from 'react-native-snap-carousel';

import { sliderWidth, itemWidth } from './SliderEntryStyle';
import styles from './Slider.style';

const SLIDER_1_FIRST_ITEM = 1;

type SliderProps<T> = {
  data: ReadonlyArray<T>,
  renderItem: CarouselProps<T>['renderItem'],
};
export default function Slider<T>(props: SliderProps<T>) {
  const {
    data,
    renderItem,
  } = props;
  //const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(SLIDER_1_FIRST_ITEM);
  const sliderRef = useRef(null);

  //const renderItemWithParallax = useCallback(({ item, index }, parallaxProps) => {
  //  return (
  //    <SliderEntry
  //      data={ item }
  //      parallax={ true }
  //      parallaxProps={ parallaxProps }
  //    />
  //  );
  //}, []);

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
              //@ts-ignore - тип функции правильный - это баг с определением
              renderItem={ renderItem }
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
              //onSnapToItem={ setSlider1ActiveSlide }
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
