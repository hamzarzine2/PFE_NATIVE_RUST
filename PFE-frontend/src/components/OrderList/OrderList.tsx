import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { getOrder, updateOrder } from '../../services/clientService';
import ActionButton from '../ActionButton/ActionButton';
import OrderItem from '../OrderItem/OrderItem';
import { RegularOrder } from '../../models/RegularOrder';
import { Client } from '../../models/Client';

interface OrderListProps {
  client: Client;
}

const OrderList: React.FC<OrderListProps> = ({client}) => {
  const [order, setOrder] = useState<RegularOrder>({regular_order_lines: []});
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const setOrderWithChangeTracking = (newOrder: RegularOrder) => {
    setOrder(newOrder);
    setOrderChanged(true);
  };

  const handleChangeButtonPress = async () => {
    await updateOrder(client, order);
    fetchOrder();
    setOrderChanged(false);
  }

  const fetchOrder = async () => {
    const order = await getOrder(client);
    setOrder(order);
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commande habituelle</Text>
      <FlatList
        nestedScrollEnabled
        data={order.regular_order_lines}
        renderItem={({ item }) => <OrderItem orderLine={item} order={order} setOrder={setOrderWithChangeTracking} />}
        keyExtractor={(item, index) => index.toString()}
      />
      {orderChanged && <ActionButton title="Mettre à jour les quantités" color="#28A745" onPress={handleChangeButtonPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007BFF',
    padding: 10,
    paddingLeft: 20,
    paddingEnd: 20,
    borderRadius: 10,
    height: "49%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default OrderList;
