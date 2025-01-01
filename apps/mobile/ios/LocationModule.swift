import Foundation
import CoreLocation

@objc(LocationModule)
class LocationModule: NSObject, CLLocationManagerDelegate {

    private var locationManager: CLLocationManager?

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    func getCurrentLocation(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("LocationModule: getCurrentLocation called")

        locationManager = CLLocationManager()
        locationManager?.delegate = self

        if CLLocationManager.locationServicesEnabled() {
            let status = CLLocationManager.authorizationStatus()
            print("LocationModule: Authorization status is \(status.rawValue)")

            if status == .notDetermined {
                locationManager?.requestWhenInUseAuthorization()
                waitForAuthorization(resolve: resolve, reject: reject)
            } else if status == .authorizedWhenInUse || status == .authorizedAlways {
                locationManager?.requestLocation()
                waitForLocation(resolve: resolve, reject: reject)
            } else {
                let error = NSError(domain: "", code: 1, userInfo: [NSLocalizedDescriptionKey: "Location access denied or restricted"])
                reject("location_denied", "Location access denied or restricted", error)
            }
        } else {
            let error = NSError(domain: "", code: 2, userInfo: [NSLocalizedDescriptionKey: "Location services are disabled"])
            reject("location_services_disabled", "Location services are disabled", error)
        }
    }

    private func waitForAuthorization(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            let status = CLLocationManager.authorizationStatus()
            if status == .authorizedWhenInUse || status == .authorizedAlways {
                self.locationManager?.requestLocation()
                self.waitForLocation(resolve: resolve, reject: reject)
            } else {
                let error = NSError(domain: "", code: 1, userInfo: [NSLocalizedDescriptionKey: "Location access denied or restricted"])
                reject("location_denied", "Location access denied or restricted", error)
            }
        }
    }

    private func waitForLocation(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            if let location = self.locationManager?.location {
                let locationData: [String: Any] = [
                    "latitude": location.coordinate.latitude,
                    "longitude": location.coordinate.longitude
                ]
                resolve(locationData)
              self.locationManager = nil
            } else {
                let error = NSError(domain: "", code: 3, userInfo: [NSLocalizedDescriptionKey: "Failed to retrieve location"])
                reject("location_error", "Failed to retrieve location", error)
            }
        }
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        print("LocationModule: didUpdateLocations called with locations count: \(locations.count)")

        guard let location = locations.last else {
            print("LocationModule: No location available")
            return
        }

        print("LocationModule: Latest location: \(location.coordinate.latitude), \(location.coordinate.longitude)")
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("LocationModule: didFailWithError called with error: \(error.localizedDescription)")
    }
}
