import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import PekeFun from "../../img/pekefun1.png";
import { Link } from "react-router-dom";


export const Categories = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-sm d-flex justify-content-center">
      <div className="w-50">
        <Carousel activeIndex={index} onSelect={handleSelect}>
<Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to="/categoryOne" style={{ textDecoration: "none" }}>
                <h3 style={{ color: "#0B6152", textShadow: "2px 2px 8px #fff" }}>
              Escuelas de Surf</h3>          
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to="/categoryTwo">
              <h3>Clases de Teatro</h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to="/">
              <h3>Campamentos de Verano </h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to="/">
              <h3>Campings</h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to="/">
              <h3>Parques Acúaticos</h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={PekeFun}
              alt="First slide"
            />

            <Carousel.Caption>
              <Link to="/">
              <h3>Baile</h3>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          
  

        </Carousel>
      </div>
    </div>
  );
};


