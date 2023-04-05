import React, { useState, useEffect } from "react";
import "../../styles/social.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "400px",
};

const center = {
  lat: 40.398396,
  lng: -3.681477,
};

export const Social_media = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAA0p9RXeAwigbbMWcrtJ6f0pl8pesrj8E",
  });

  const [map, setMap] = React.useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  //Lógica del geocoding a partir de aquí
  //*************************************

  function getmarker() {
    var address = "Santa Justa, Sevilla";
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        console.log(results[0].geometry.location);
      } else {
        console.log(status);
      }
    });
  }

  //Fin geocoding
  //*************

  const markers = [
    {
      id: 1,
      name: "Retiro, Madrid",
      position: { lat: 40.41342556732059, lng: -3.6809039679921103 },
    },
    {
      id: 2,
      name: "Plaza Mayor, Madrid",
      position: { lat: 40.41529073310998, lng: -3.7073479258552293 },
    },
    {
      id: 3,
      name: "Ciudad Deportiva, Getafe",
      position: { lat: 40.32453121223733, lng: -3.7119511963745686 },
    },
    {
      id: 4,
      name: "Media Makrt (Chamartin), Madrid",
      position: { lat: 40.46221232575594, lng: -3.688854355139412 },
    },
  ];

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <div className="social-div">
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
              <div className="card-body">
                <h5 className="card-title">Camping y salud</h5>
                <p className="card-text text-just">
                  Niños y adultos pueden pasarlo muy bien en una jornada al aire
                  libre, pero, ¿qué beneficios...
                </p>
                <a href="#" className="btn btn-primary">
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
              <div className="card-body">
                <h5 className="card-title">Torneo ADS</h5>
                <p className="card-text text-just">
                  Tras un campeonato difícil, los chicos consiguieron hacerse
                  con la victoria en el torneo...
                </p>
                <a href="#" className="btn btn-primary">
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  getmarker();
                }}
              >
                Primary
              </button>
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
