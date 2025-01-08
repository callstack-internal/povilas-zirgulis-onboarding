import {queryOptions} from '@tanstack/react-query';
import LocationModule from '@repo/apps/mobile/src/utils/location.types';
import {checkLocationPermissions} from '@repo/apps/mobile/src/utils/permissions';

export const locationQueries = {
  currentLocation: () =>
    queryOptions({
      queryKey: ['currentLocation'],
      queryFn: getCurrentLocation,
    }),
};

export const getCurrentLocation = async () => {
  const hasPermission = await checkLocationPermissions();

  if (hasPermission.granted) {
    const location = await LocationModule.getCurrentLocation();
    return location;
  } else {
    console.error('Location permission denied');
  }
};
