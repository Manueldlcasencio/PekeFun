import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Surf from "../../img/surf.png";
import Campamento from "../../img/campamento.png";
import Teatro from "../../img/teatro1.png";
import Acuatico from "../../img/acuatico.png";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container d-flex justify-content-center ">
      <div className="w-75">
        <Carousel activeIndex={index} onSelect={handleSelect} slide={true}>
          <Carousel.Item>
            <img className="d-block w-100" src={Surf} alt="First slide" />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Escuelas de Surf
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={Teatro} alt="Second slide" />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Clases de Teatro
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Campamento}
              alt="Third slide"
            />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Campamentos de Verano{" "}
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={Surf} alt="Fourth slide" />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Campings
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={Surf} alt="Fifth slide" />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Parques Acuáticos
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={Surf} alt="Fifth slide" />
            <Carousel.Caption>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    color: "#0B6152",
                    textShadow: "2px 2px 8px #fff",
                  }}
                >
                  Baile 
                </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          

          </Carousel>
          
          </div>
          </div>
  );
                };