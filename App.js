import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from './Screens/Favorites';
import Home from './Screens/Home';

const Stack = createStackNavigator();

const App =()=>{
  return(
    <NavigationContainer>
   <Stack.Navigator>
    <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
    <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
   </Stack.Navigator>
    </NavigationContainer> 
    
  );
}

export default App;
