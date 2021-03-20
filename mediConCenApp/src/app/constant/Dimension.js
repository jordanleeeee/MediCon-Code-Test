import {Dimensions} from 'react-native';

const Dimension = {
  width: Math.round(Dimensions.get('window').width),
  height: Math.round(Dimensions.get('window').height),
}

module.exports = Dimension