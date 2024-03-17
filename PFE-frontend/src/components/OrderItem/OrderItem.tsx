import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RegularOrder } from '../../models/RegularOrder';
import { OrderLine } from '../../models/OrderLine';

interface OrderItemProps {
  orderLine: OrderLine;
  order: RegularOrder;
  setOrder: (order: any) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderLine, order, setOrder }) => {
  const [quantityInput, setQuantityInput] = useState(orderLine.quantity.toString());
  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>{orderLine.size ? orderLine.label.concat(' ', orderLine.size) : orderLine.label}</Text>
      <TextInput
        style={styles.quantityInput}
        value={quantityInput}
        keyboardType="numeric"
        onChangeText={(text) => {
            setQuantityInput(text);
            order.regular_order_lines.find((a) => a.item_id === orderLine.item_id)!.quantity = parseInt(text);
            setOrder(order);
          }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
    color: 'white',
  },
  quantityInput: {
    backgroundColor: 'white',
    width: 50,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default OrderItem;
