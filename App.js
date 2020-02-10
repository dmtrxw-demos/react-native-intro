import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Card({ item, index, navigation }) {
  const firstChild = index === 0;
  let marginTop = 0;

  if (firstChild) {
    marginTop = 15;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          id: item.id,
        })
      }>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          marginLeft: 15,
          marginRight: 15,
          marginTop,
          paddingTop: 30,
          paddingBottom: 30,
          backgroundColor: '#fff',
          marginBottom: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#e0e0e0',
        }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/todos');
      setTodos(data);
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      data={todos}
      refreshing={refreshing}
      onRefresh={fetchData}
      renderItem={({ item, index }) => (
        <Card index={index} item={item} navigation={navigation} />
      )}
      keyExtractor={item => String(item.id)}
    />
  );
}

function DetailsScreen({ route, navigation }) {
  const { id } = route.params;

  useEffect(() => {
    console.log('DetailsScreen rendered');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is Details Screen, for ID: {id}</Text>
    </View>
  );
}

function HomeNavigator() {
  useEffect(() => {
    console.log('HomeScreen rendered');
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Todo App',
          headerStyle: { backgroundColor: '#333' },
          headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SettingsScreen({ navigation }) {
  useEffect(() => {
    console.log('SettingsScreen rendered');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>This is Settings Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: {
            backgroundColor: '#333',
          },
          activeTintColor: '#fff',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
