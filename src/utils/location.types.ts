import {NativeModules} from 'react-native';

const {LocationModule} = NativeModules;

export type Location = {
  latitude: number;
  longitude: number;
};

interface LocationInterFace {
  getCurrentLocation(): Promise<Location>;
}

export default LocationModule as LocationInterFace;
