import React, { useState } from "react";
import "../../styles/social.css";

export const Social_media = () => {
  const [count, setCount] = useState(0);
  let place = ["Atocha, Madid", "Santa Justa, Sevilla"];

  return (
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
                type="button boton"
                class="btn btn-success boton my-1"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                Siguiente
              </button>
              <button
                type="button"
                class="btn btn-danger boton my-1"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                Anterior
              </button>
            </div>
            <iframe
              loading="lazy"
              width="75%"
              height="380px"
              allowfullscreen
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyAA0p9RXeAwigbbMWcrtJ6f0pl8pesrj8E&q=" +
                place[count]
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Google API Key: AIzaSyAA0p9RXeAwigbbMWcrtJ6f0pl8pesrj8E
