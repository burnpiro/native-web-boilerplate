import { AppRegistry } from 'react-native';
import App from './src/App';
AppRegistry.registerComponent('nativewebboilerplate', () => App);
AppRegistry.runApplication('nativewebboilerplate', { rootTag: document.getElementById('root') });