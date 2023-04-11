import React, { useState, useContext } from "react";
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
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";



export const Categories = () => {
  const { store, actions } = useContext(Context);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  const items = [
    {
      image: Surf,
      url: "/surfcamp",
      cat: "Escuelas de Surf",
    },
    { 
      image: Verano,
      url: "/verano",
      cat: "Campamentos de Verano",
     
    },
    {
      image: Musica,
      url: "/musica",
      cat: "Música",
    },
    {
      image: Acuatico,
      url: "/acuatico",
      cat:"Parques Acuáticos",
    },
    {
      image: Baile,
      url: "/baile",
      cat: "Baile",
    },
    {
      image: Futbol,
      url: "/futbol",
      cat: "Fútbol",

    },

    {
      image: Cocina,
      url: "/cocina",
      cat: "Cocina",
    },

    {
      image: Programacion,
      url: "/programacion",
      cat: "Programación",
    },

    {
      image: Campamento,
      url: "/campamento",
      cat: "Campings",
      
    },

    {
      image: Teatro,
      url: "/teatro",
     cat: "Clases de Teatro",
    
    },



  ];
 const mostrarCards = (selectedCategory) => {
  console.log(selectedCategory);
  actions.filterEventsByCategory(selectedCategory); 
  console.log(store.events_filtered);
  return <Navigate to="/" />;
 };

  const itemsToRender = [];

  for (let i = 0; i < items.length; i += 3) {
    const item = (
      <Carousel.Item key={i}>
        <div className="d-flex justify-content-between">
          <div className="w-30">
          {/*  <Link to={items[i].url}> */}
          <span onClick={()=> mostrarCards(items[i].cat)}>
          <img className="d-block w-100"  src={items[i].image} alt={i} />
          </span>
            {/*  </Link> */}
          </div>
          <div className="w-30">
            {i + 1 < items.length && (
                <span onClick={()=> mostrarCards(items[i+1].cat)}>
                <img
                  className="d-block w-100"
                  src={items[i + 1].image}
                  alt={i + 1}
                />
               </span>
            )}
          </div>
          <div className="w-30">
            {i + 2 < items.length && (
              <span onClick={()=> mostrarCards(items[i+2].cat)}>

                <img
                  className="d-block w-100"
                  src={items[i + 2].image}
                  alt={i + 2}
                />
              </span>
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