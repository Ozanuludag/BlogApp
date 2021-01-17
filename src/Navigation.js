import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlogListScreen from './screens/BlogListScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';

const Navigation = () => {
    const Stack = createStackNavigator();
    const screenStyle = {
      headerStyle: {
        backgroundColor:'#495057',
      },
      headerTintColor: '#fff',
    }
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenStyle} initialRouteName="BlogListScreen" >
            <Stack.Screen name="BlogListScreen" component={BlogListScreen} />
            <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default Navigation

const styles = StyleSheet.create({})
