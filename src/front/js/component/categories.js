import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Surf from "../../img/surf.png";
import Campamento from "../../img/campamento.png";
import Teatro from "../../img/teatro1.png";
import Acuatico from "../../img/acuatico.png";
import Baile from "../../img/baile.png";
import Cocina from "../../img/cocina.png";
import Futbol from "../../img/futbol.png";
import Programacion from "../../img/programacion.png";
import Musica from "../../img/musica.png";
import Verano from "../../img/verano.png";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const items = [
    {
      image: Surf,
      url: "/surfcamp",
    },
    { 
      image: Verano,
      url: "/verano",
     
    },
    {
      image: Musica,
      url: "/musica",
    },
    {
      image: Acuatico,
      url: "/acuatico",
    },
    {
      image: Baile,
      url: "/baile",
    },
    {
      image: Futbol,
      url: "/futbol",
    },

    {
      image: Cocina,
      url: "/cocina",
    },

    {
      image: Programacion,
      url: "/programacion",
    },

    {
      image: Campamento,
      url: "/campamento",
      
    },

    {
      image: Teatro,
      url: "/teatro",
     
    
    },



  ];

  const itemsToRender = [];

  for (let i = 0; i < items.length; i += 3) {
    const item = (
      <Carousel.Item key={i}>
        <div className="d-flex justify-content-between">
          <div className="w-30">
            <Link to={items[i].url}>
              <img className="d-block w-100" src={items[i].image} alt={i} />
            </Link>
          </div>
          <div className="w-30">
            {i + 1 < items.length && (
              <Link to={items[i + 1].url}>
                <img
                  className="d-block w-100"
                  src={items[i + 1].image}
                  alt={i + 1}
                />
              </Link>
            )}
          </div>
          <div className="w-30">
            {i + 2 < items.length && (
              <Link to={items[i + 2].url}>
                <img
                  className="d-block w-100"
                  src={items[i + 2].image}
                  alt={i + 2}
                />
              </Link>
            )}
          </div>
        </div>
      </Carousel.Item>
    );
    itemsToRender.push(item);
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {itemsToRender}
    </Carousel>
  );
};
