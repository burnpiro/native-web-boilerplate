import { AppRegistry } from 'react-native';
import App from './src/App';

import fonts from './web/css/index.css';

AppRegistry.registerComponent('nativewebboilerplate', () => App);
AppRegistry.runApplication('nativewebboilerplate', { rootTag: document.getElementById('root') });
