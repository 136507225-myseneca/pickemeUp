import React, { useState, useEffect } from 'react'
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from '@react-google-maps/api'
import './Map.css'
import { googleMapsApiKey } from '../../Constant/ApiKey'
import Geocode from 'react-geocode'

const Map = ({ findLocation }) => {
  const [activeMarker, setActiveMarker] = useState(null)
  const [address, setAddress] = useState(null)
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey, // API key
  })
  Geocode.setApiKey(googleMapsApiKey)
  Geocode.setLanguage('en')
  Geocode.setRegion('es')
  Geocode.setLocationType('ROOFTOP')
  useEffect(() => {
    if (findLocation === true) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.longitude,
              lng: position.coords.latitude,
            })
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                const address = response.results[0].formatted_address
                setAddress(address)

                console.log(address)
              },
              (error) => {
                console.error(error)
              }
            )
          },
          (e) => {
            console.log(e)
          }
        )
      } else {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then(function (result) {
            if (result.state === 'granted') {
              console.log(result.state)
            } else if (result.state === 'prompt') {
              console.log(result.state)
            } else if (result.state === 'denied') {
              console.log('denied')
            }
            result.onchange = function () {
              console.log(result.state)
            }
          })
      }
    }
  }, [findLocation])
  return isLoaded ? (
    <GoogleMap
      id='map'
      center={center}
      zoom={15}
      mapContainerStyle={{ height: '100vh' }}
    >
      <Marker position={center} onMouseOver={() => setActiveMarker(1)}>
        {activeMarker === 1 ? (
          <InfoWindow
            position={center}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              {' '}
              <div className='info-window'>
                <div className='info-heading'>Location Details</div>
                <div className='info-body'>
                  {`Long:  ${center.lng}`}
                  <br />
                  {`Lat:  ${center.lat}`}
                  <br />
                  {`Address: ${address}`}
                </div>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
