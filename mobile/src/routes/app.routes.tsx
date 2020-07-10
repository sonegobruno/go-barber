import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator();

import Dashboard from '../pages/Dashboard';


const AppRoutes: React.FC = () => {
    return(
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{backgroundColor: '#312e38'}
            }}
        >
            <Auth.Screen name="Dashboard" component={Dashboard} />
        </Auth.Navigator>
    );    
}

export default AppRoutes;