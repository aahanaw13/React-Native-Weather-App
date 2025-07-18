import React, {useState, useEffect} from "react";
import { 
  ActivityIndicator,
  Alert,
  ImageBackground, 
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {LinearGradient} from  'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';  

const WeatherApp = ()=>{
  const [weather, setWeather]=useState(null);
  const [city, setCity]=useState('');
  const [loading, setLoading]=useState(false);
  const [currentLocation, setCurrentLocation]=useState('');
   
  const API_KEY=null;
  const BASE_URL='https://api.openweathermap.org/data/2.5/weather';
  
  const fetchWeather=async (cityName: string)=>{
    if (!cityName.trim()){
      Alert.alert("Error", "Please mention a city name.");
      return
    }
    setLoading(true);
    try{
    const response= await fetch( `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=imperial`);
    const data=await response.json();
    if (response.ok){
      setWeather(data);
      setCurrentLocation(cityName);
    } else {
      Alert.alert("Error", data.message||"City not found.")
    }
    } catch (error){
    Alert.alert("Error", "Failed to fetch weather data.")
    } finally{
    setLoading(false);
    }
  };
  const getWeatherIcon= (condition)=>{
    switch(condition){
      case 'Clear':
        return 'sunny';
      case 'Clouds':
        return 'cloudy';
      case 'Rain':
        return 'rainy';
      case 'Drizzle':
        return 'rainy';
      case 'Thunderstorm':
        return 'thunderstorm';
      case 'Snow':
        return 'snow';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
        return 'cloudy';
      default: 
        return 'partly-sunny';
    }
  };
  const getGradientColors = (condition)=>{
    switch (condition){
      case 'Clear':
        return ['#87CEEB', '#98D8E8'];
      case 'Clouds':
        return ['#778899', '#B0C4DE'];
      case 'Rain':
      case 'Drizzle':
        return ['#4682B4', '#87CEEB'];
      case 'Thunderstorm':
        return ['#2F4F4F', '#708090'];
      case 'Snow':
        return ['#E6E6FA', '#F0F8FF'];
      default:
        return ['#4A90E2', '#7BB3F0'];
    }
  };
  const formatTime=(timestamp)=>{
    return new Date(timestamp*1000).toLocaleTimeString('en-US',{
      hour:'2-digit', minute:'2-digit'
    })
  };
  return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView/>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  detailItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 2,
  },
  sunTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sunTimeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '48%',
  },
  sunTimeLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    opacity: 0.8,
  },
  sunTimeValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 2,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default WeatherApp;