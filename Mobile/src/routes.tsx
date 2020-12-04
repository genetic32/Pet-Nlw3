import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} =createStackNavigator();

import MapaAnimal from './pages/MapaAnimal';
import PetDetails from './pages/PetDetails';

import SelectMapPosition from './pages/CreatePages/SelectMapPosition';
import PetData from './pages/CreatePages/PetData';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'} }}>
                <Screen name="MapaAnimal" component={MapaAnimal}/>

                <Screen name="PetDetails" component={PetDetails} 
                options={{ headerShown: true, 
                header: () => <Header showCancel={false} title="Dados do animal"/>}}/>

                <Screen name="SelectMapPosition" component={SelectMapPosition}
                 options={{ headerShown: true, 
                    header: () => <Header title="Selecione no mapa"/>}}/>
    

                <Screen name="PetData" component={PetData}
                 options={{ headerShown: true, 
                    header: () => <Header title="Informe os dados"/>}}/>
   
 
                
            </Navigator>
        </NavigationContainer>

    )
}