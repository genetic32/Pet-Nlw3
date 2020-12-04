import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'; 

import mapMarker from '../images/map-markercat.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface PetItem{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function MapaAnimal() {
  const [ pet, setPet ] = useState<PetItem[]>([]);
  
  const Navigation = useNavigation();


    useEffect(() => {
      api.get('pet').then(response => {
        setPet(response.data);
      });
    }, [] );

    function handleNavigateToPetDetails(id: number) {
        Navigation.navigate('PetDetails', { id });
    }

    function handleNavigateToCreatePages() {
        Navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -14.863548,
            longitude: -40.8491681,
            latitudeDelta: 0.008,
            longitudeDelta: 0.00 ,
          }}
         >
          {pet.map(pet => {
            return(
              <Marker
              key={pet.id}
          icon={mapMarker}
          coordinate={{
            latitude: pet.latitude,
            longitude: pet.longitude,
          }}
          >
            <Callout onPress={() => handleNavigateToPetDetails(pet.id)}>
              <View style={styles.calloutContainer}>
        <Text style={styles.calloutText}>{pet.name}</Text>
              </View>
             </Callout>
            </Marker>
            );
          })}
          </MapView>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{pet.length} Animais Encontrados</Text>

            <RectButton style={styles.createAnimalButton} onPress={handleNavigateToCreatePages}>
             <Feather name="plus" size={20} color="#FFF"/>
            </RectButton>
  
          </View>
      </View>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
    },
    calloutText: {
      color: '#000000',
      fontSize: 14,
  
    },
    footer: {
      position: 'absolute',
      left: 24,
      right:24,
      bottom:32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft:24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
   },
  
    footerText: {
      color: '#8fa7b3',
  
    },
  
    createAnimalButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
  
    }
  });
