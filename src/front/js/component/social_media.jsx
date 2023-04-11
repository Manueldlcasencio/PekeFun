import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/social.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export const Social_media = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAA0p9RXeAwigbbMWcrtJ6f0pl8pesrj8E",
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState([]);

  const { store } = useContext(Context);

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  //Lógica del geocoding
  //********************

  async function getmarker(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, function (results, status) {
        if (status == "OK") {
          let loc = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(loc);
        } else {
          reject(status);
        }
      });
    });
  }
  let addresses = [];
  if (store.events.length > 1 && event.length == 0) {
    setEvent(store.events);
  }
  if (event.length > 1) {
    event.forEach((address) => {
      addresses.push(address.localization);
    });
  }

  async function marking_map() {
    if (markers.length < 1 && addresses.length > 0) {
      console.log("TRY");
      try {
        const positions = await Promise.all(
          addresses.map(async (place) => {
            const position = await getmarker(place);
            return { name: place, position };
          })
        );
        setMarkers(
          positions.map((item, index) => ({
            id: index,
            name: item.name,
            position: item.position,
          }))
        );
      } catch (error) {
        console.error("Error fetching marker positions:", error);
      }
    }
  }
  //Fin geocoding
  //*************

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    marking_map();
    const Checker = () => {
      if (localStorage.getItem("map") == "[]") {
        setTimeout(function () {
          Checker();
        }, 100);
      } else {
        let aux = JSON.parse(localStorage.getItem("map"));
        aux.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
      }
    };
    Checker();
  };

  localStorage.setItem("map", JSON.stringify(markers));

  //Carga de mapa retrasada
  const mapa = (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      onLoad={handleOnLoad}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
      <></>
    </GoogleMap>
  );

  return isLoaded ? (
    <div className="social-div my-4">
      <div className="social-header">
        <h3>Nuestra comunidad</h3>
      </div>
      <div className="container-fluid d-inline-flex justify-content-evenly">
        <div className="my-3 mx-auto p-3 d-flex flex-column justify-content-between half">
          <h5 className="text-center">Nuestros participantes</h5>
          <div className="container d-inline-flex justify-content-center">
            {/* Card 1 */}
            <div className="card card-social m-2" id="card-1">
              <img
                src="https://d38b8me95wjkbc.cloudfront.net/uploads/blog/cover_image/190/blog_image_2038713.jpg"
                className="card-img-top cardimg p-1 mx-auto"
                alt="Kids around a fire"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Camping y salud</h5>
                <p className="card-text text-just">
                  Niños y adultos pueden pasarlo muy bien en una jornada al aire
                  libre, pero, ¿qué beneficios...
                </p>
                <a href="#" className="btn btn-primary mt-auto">
                  Ver más
                </a>
              </div>
            </div>
            {/* Card 2 */}
            <div className="card card-social m-2">
              <img
                src="https://www.moralzarzal.es/wp-content/uploads/2019/06/F%C3%9ATBOL-SALA-ALEV%C3%8DN-.jpg"
                className="card-img-top cardimg p-1 mx-auto"
                alt="..."
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Torneo ADS</h5>
                <p className="card-text text-just">
                  Tras un campeonato difícil, los chicos consiguieron hacerse
                  con la victoria en el torneo...
                </p>
                <a href="#" className="btn btn-primary mt-auto">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="m-3 p-3 half">
          <h5 className="text-center">Algunos de nuestros eventos</h5>
          <div className="container d-inline-flex">
            <div width="5%" className="d-flex flex-column mx-2">
              {event.length > 1 ? mapa : <h4>Cargando</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

// Google API Key: AIzaSyAA0p9RXeAwigbbMWcrtJ6f0pl8pesrj8E
