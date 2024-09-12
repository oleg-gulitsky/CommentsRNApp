import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAppSelector} from '../store';

import {MainScreen} from './screens/MainScreen';
import {LogInScreen} from './screens/LogInScreen';

const Stack = createNativeStackNavigator();

export function Navigation() {
  const userName = useAppSelector(state => state.user.info.name);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userName ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <Stack.Screen name="LogIn" component={LogInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
