package com.weatherapp

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = LocationModule.NAME)
class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME = "LocationModule"
        private const val LOCATION_TIMEOUT = 10000L // 10 seconds
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        val locationManager = reactApplicationContext.getSystemService(ReactApplicationContext.LOCATION_SERVICE) as LocationManager

        if (ActivityCompat.checkSelfPermission(
                reactApplicationContext,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            promise.reject("E_PERMISSION_DENIED", "Location permission not granted")
            return
        }

        if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) &&
            !locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
        ) {
            promise.reject("E_LOCATION_SERVICES_DISABLED", "Location services are disabled")
            return
        }

        val locationListener = object : LocationListener {
            override fun onLocationChanged(location: Location) {
                locationManager.removeUpdates(this)
                val locationMap = Arguments.createMap().apply {
                    putDouble("latitude", location.latitude)
                    putDouble("longitude", location.longitude)
                }
                promise.resolve(locationMap)
            }

            override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
            override fun onProviderEnabled(provider: String) {}
            override fun onProviderDisabled(provider: String) {}
        }

        try {
            locationManager.requestLocationUpdates(
                LocationManager.GPS_PROVIDER,
                0L,
                0f,
                locationListener,
                Looper.getMainLooper()
            )
            locationManager.requestLocationUpdates(
                LocationManager.NETWORK_PROVIDER,
                0L,
                0f,
                locationListener,
                Looper.getMainLooper()
            )

            Handler(Looper.getMainLooper()).postDelayed({
                locationManager.removeUpdates(locationListener)
                promise.reject("E_LOCATION_TIMEOUT", "Location request timed out")
            }, LOCATION_TIMEOUT)
        } catch (e: Exception) {
            promise.reject("E_LOCATION_ERROR", "Error getting location: ${e.message}")
        }
    }
}