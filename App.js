import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation/Navigation';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Navigation />
      {/* <DashboardScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});