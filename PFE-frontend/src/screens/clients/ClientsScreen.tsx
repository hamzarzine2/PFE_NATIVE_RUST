import React from 'react';
import { View } from 'react-native';
import ClientList from '../../components/ClientList/ClientList';

const ClientsScreen: React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <ClientList />
    </View>
  );
};

export default ClientsScreen;
