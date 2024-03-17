import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import ToursChooseLine from '../toursChooseLine/toursChooseLine';
import { TourContext } from '../../contexts/TourContext';
import { Tour } from '../../models/tour';
import { useIsFocused } from '@react-navigation/native';

interface ToursChooseProps {
  navigation?: any;
}

const ToursChoose: React.FC<ToursChooseProps> = ({ navigation }) => {
  const { getToursToday } = useContext(TourContext);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const fetchedTours = await getToursToday();
        setTours(fetchedTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [isFocused, getToursToday]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
      {tours.map((tour, index) => (
        <ToursChooseLine key={index} id={tour.tour} title={tour.geo_zone} creche={tour.clients} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default ToursChoose;
