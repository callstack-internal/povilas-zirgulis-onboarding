import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const checkLocationPermissions = async () => {
  try {
    if (!PERMISSIONS) {
      return {granted: false, status: RESULTS.UNAVAILABLE};
    }

    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    const permissionStatus = await check(permission);

    switch (permissionStatus) {
      case RESULTS.GRANTED:
        return {granted: true, status: permissionStatus};
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        return {
          granted: requestResult === RESULTS.GRANTED,
          status: requestResult,
        };
      case RESULTS.BLOCKED:
        return {granted: false, status: permissionStatus};
      default:
        return {granted: false, status: permissionStatus};
    }
  } catch (error) {
    console.error('Error checking location permissions:', error);
    return {granted: false, status: RESULTS.UNAVAILABLE};
  }
};
