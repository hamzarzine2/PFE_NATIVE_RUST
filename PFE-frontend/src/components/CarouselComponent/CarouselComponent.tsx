// CarouselComponent.tsx

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import QuantityLine from '../QuantityLine/QuantityLine';
import { Boxe } from '../../models/boxe';

const CarouselComponent : React.FC<{items: Boxe[]}> = ({items}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

 

  const renderItem = ({ item }: { item: Boxe }) => {
    //@ts-ignore
    return <QuantityLine label={item.label} quantity={item.quantity} size={item.size} />;
  };

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={items}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 20} 
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationDotInactive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  paginationContainer: {
    marginTop: -20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#D4A866', // Active dot color
  },
  paginationDotInactive: {
    backgroundColor: '#7E7E7E', // Inactive dot color
  },
});

export default CarouselComponent;
