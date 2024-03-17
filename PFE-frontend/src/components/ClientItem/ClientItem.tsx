import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../models/Client';

const ClientItem = ({ client }: { client: Client }) => {
	const navigation = useNavigation();

	const navigateToClientDetails = () => {
		//@ts-ignore
		navigation.navigate('ClientDetailsScreen', { client });
	};

	return (
		<TouchableOpacity onPress={navigateToClientDetails}>
			<View style={styles.clientItem}>
				<View style={{width: "85%"}}>
					<Text style={styles.clientText}>{client.name}</Text>
				</View>
				<Ionicons name="settings" size={24} color="black" />
			</View>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	clientItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 15,
	},
	clientText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 18,
	}
});

export default ClientItem;
