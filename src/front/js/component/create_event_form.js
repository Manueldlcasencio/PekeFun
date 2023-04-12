import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Create_event_form = () => {
  const { actions } = useContext(Context);
  const [eventData, setEventData] = useState({
    name: "", street: "", city: "", min_age: "", max_age: "", price: "", image: "", date: "", length: "", category: "", slots: "", description: "", contact: "", company: "", cloth: "", others: ""
  });
  const email = localStorage.getItem('email');
  
  /*ARRAY DE PRUEBA (EVENTS ARRAY), BORRAR LUEGO!!!!!!*/
  const eventsArray = [
    { name: "Escuela de Surf",
      street: "Avenida del Mar",
      city: "Málaga",
      min_age: 8,
      max_age: 16,
      price: 100,
      image: "https://escueladesurflasdunas.com/wp-content/uploads/2021/05/image-asset.jpeg",
      date: "2023-07-01",
      length: 7,
      category: "Escuelas de Surf",
      slots: 30,
      description: "Aprende a surfear en nuestras clases para niños y jóvenes.",
      contact: "info@surf-niños.es",
      company: "Surf Niños",
      cloth: "Traje de baño y toalla",
      others: "Protector solar y gorra"
    },
    {
      name: "Taller de Teatro",
      street: "Calle del Arte",
      city: "Madrid",
      min_age: 7,
      max_age: 15,
      price: 50,
      image: "https://www.tallerparentesis.com/wp-content/uploads/2018/04/teatro-ninos.jpg",
      date: "2023-06-10",
      length: 5,
      category: "Clases de Teatro",
      slots: 25,
      description: "Desarrolla tus habilidades de actuación en nuestro taller de teatro.",
      contact: "info@teatro-niños.es",
      company: "Teatro Niños",
      cloth: "Ropa cómoda",
      others: "Libreta y lápiz"
    },
    {
      name: "Campamento de Verano",
      street: "Camino de la Montaña",
      city: "Granada",
      min_age: 10,
      max_age: 18,
      price: 300,
      image: "https://www.vigopeques.com/wp-content/uploads/2020/06/campamento-de-verano-tatarina-940x640.png",
      date: "2023-07-15",
      length: 14,
      category: "Campamentos de Verano",
      slots: 50,
      description: "Disfruta de dos semanas de diversión y aprendizaje en nuestro campamento.",
      contact: "info@campamento-niños.es",
      company: "Campamento Niños",
      cloth: "Ropa cómoda y de abrigo",
      others: "Mochila, saco de dormir y linterna"
    },
    {
      name: "Camping Familiar",
      street: "Parque Natural",
      city: "Girona",
      min_age: 5,
      max_age: 60,
      price: 150,
      image: "https://www.bassegodapark.com/FitxersWeb/12243/06-raons-anar-camping-web-noticia.jpg",
      date: "2023-08-01",
      length: 7,
      category: "Campings",
      slots: 100,
      description: "Una semana de camping en familia en un entorno natural.",
      contact: "info@camping-niños.es",
      company: "Camping Niños",
      cloth: "Ropa adecuada",
      others: "Tienda de campaña y equipo de camping"
    },
    {
      name: "Parque Acuático",
      street: "Calle de la Diversión",
      city: "Alicante",
      min_age: 4,
      max_age: 99,
      price: 20,
      image: "https://imagenes.20minutos.es/files/og_thumbnail/uploads/imagenes/2015/08/17/2047958a.jpg",
      date: "2023-06-20",
      length: 1,
      category: "Parques Acuáticos",
      slots: 500,
      description: "Un día lleno de emociones y diversión acuática para toda la familia.",
      contact: "info@parqueacuatico-niños.es",
      company: "Parque Acuático Niños",
      cloth: "Trade baño y toalla",
      others: "Protector solar y gafas de sol"
      },
      {
      name: "Taller de Cocina",
      street: "Plaza de los Sabores",
      city: "Sevilla",
      min_age: 6,
      max_age: 14,
      price: 25,
      image: "https://www.alcalanorte.com/wp-content/uploads/2018/12/shutterstock_167288825-1200x675.jpg",
      date: "2023-05-18",
      length: 2,
      category: "Cocina",
      slots: 20,
      description: "Aprende a cocinar deliciosos platos en nuestro taller de cocina para niños.",
      contact: "info@cocina-niños.es",
      company: "Cocina Niños",
      cloth: "Delantal",
      others: "Todos los ingredientes incluidos"
      },
      {
      name: "Curso de Programación",
      street: "Calle de la Tecnología",
      city: "Bilbao",
      min_age: 10,
      max_age: 16,
      price: 150,
      image: "https://blogcomparasoftware-192fc.kxcdn.com/wp-content/uploads/2022/10/Cursos-de-programacion-para-ninos-01-1024x640.jpg",
      date: "2023-07-05",
      length: 10,
      category: "Programación",
      slots: 30,
      description: "Aprende a programar en nuestro curso de programación para niños y jóvenes.",
      contact: "info@programacion-niños.es",
      company: "Programación Niños",
      cloth: "Ropa cómoda",
      others: "Portátil"
      },
      {
      name: "Clases de Música",
      street: "Avenida de la Melodía",
      city: "Valladolid",
      min_age: 5,
      max_age: 18,
      price: 60,
      image: "https://centrolafabrica.com/wp-content/uploads/2017/12/ni%C3%B1os.jpg",
      date: "2023-04-25",
      length: 4,
      category: "Música",
      slots: 15,
      description: "Aprende a tocar un instrumento en nuestras clases de música para niños.",
      contact: "info@musica-niños.es",
      company: "Música Niños",
      cloth: "Ropa cómoda",
      others: "Instrumento musical"
      },
      {
      name: "Escuela de Fútbol",
      street: "Calle del Deporte",
      city: "Zaragoza",
      min_age: 8,
      max_age: 14,
      price: 120,
      image: "https://www.diversioncolsubsidio.com/uploads/productos/3d544aa7105769b7c7d2867f2b1b697fd853e68b.jpg-Escualas_Futbol_1400x1016px%20(1).jpg",
      date: "2023-06-12",
      length: 6,
      category: "Fútbol",
      slots: 40,
      description: "Mejora tus habilidades de fútbol en nuestra escuela para niños y jóvenes.",
      contact: "info@futbol-niños.es",
      company: "Fútbol Niños",
      cloth: "Equipo de fútbol",
      others: "Botas de fútbol y espinilleras"
      },
      {
      name: "Clases de Baile",
      street: "Calle de la Danza",
      city: "Córdoba",
      min_age: 4,
      max_age: 12,
      price: 30,
      image: "https://asisebaila.com/wp-content/uploads/2020/01/bailes-para-ninos-y-ninas.jpg",
      date: "2023-05-03",
      length: 4,
      category: "Baile",
      slots: 20,
      description: "Aprende diferentes estilos de baile en nuestras clases para niños.",
      contact: "info@baile-niños.es",
      company: "Baile Niños",
      cloth: "Ropa de baile",
      others: "Zapatillas de baile"
    },
    {
    name: "Campamento de Surf",
    street: "Playa del Viento",
    city: "Cádiz",
    min_age: 10,
    max_age: 17,
    price: 200,
    image: "https://www.watsaysurfschool.com/wp-content/uploads/2020/10/escuelas-de-surf-en-cantabria.jpg",
    date: "2023-08-15",
    length: 7,
    category: "Escuelas de Surf",
    slots: 30,
    description: "Disfruta de una semana de surf en nuestro campamento de verano para niños y jóvenes.",
    contact: "info@campamento-surf-niños.es",
    company: "Campamento Surf Niños",
    cloth: "Traje de baño y toalla",
    others: "Protector solar y gorra"
    },
    {
    name: "Taller de Teatro Musical",
    street: "Plaza del Espectáculo",
    city: "Salamanca",
    min_age: 7,
    max_age: 15,
    price: 45,
    image: "https://www.escuelajana.com/wp-content/uploads/2014/03/high-school-music-3-193-740x346.jpg",
    date: "2023-06-25",
    length: 5,
    category: "Clases de Teatro",
    slots: 25,
    description: "Aprende a cantar, bailar y actuar en nuestro taller de teatro musical para niños.",
    contact: "info@teatro-musical-niños.es",
    company: "Teatro Musical Niños",
    cloth: "Ropa cómoda",
    others: "Botella de agua"
    }
    ];  

//formula para prueba de array A BORRAR!!!
const handleTestEvents = () => {
  const email = localStorage.getItem('username');
  const token = localStorage.getItem('token')

  eventsArray.forEach(event => {
    actions.createEvent(email, event, token);
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventRegistered = await actions.createEvent(email, eventData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
      <h1>Crea un evento</h1>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">Nombre del evento</label>
        <input type="text" className="form-control" id="name" name="name" value={eventData.name} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese un nombre válido para el evento.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="street" className="form-label">Calle y número del evento</label>
        <input type="text" className="form-control" id="street" name="street" value={eventData.street} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una calle del evento válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="city" className="form-label">Ciudad del evento</label>
        <input type="text" className="form-control" id="city" name="city" value={eventData.city} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una ciudad para el evento válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="min_age" className="form-label">Edad mínima</label>
        <input
          type="number" className="form-control" id="min_age" name="min_age" value={eventData.min_age} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una edad mínima válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="max_age" className="form-label">Edad máxima</label>
        <input type="number" className="form-control" id="max_age" name="max_age" value={eventData.max_age} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una edad máxima válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="price" className="form-label">URL de una Imagen del evento</label>
        <input type="number" className="form-control" id="price" name="price" value={eventData.image} onChange={handleInputChange} />
        <div className="invalid-feedback">
          Por favor, ingrese un link válido para su imagen
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="price" className="form-label">Precio</label>
        <input type="number" className="form-control" id="price" name="price" value={eventData.price} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese un precio válido.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="date" className="form-label">Fecha del evento</label>
        <input type="date" className="form-control" id="date" name="date" value={eventData.date} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una fecha válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="length" className="form-label">Duración</label>
        <input type="text" className="form-control" id="length" name="length" value={eventData.length} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese una duración válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="slots" className="form-label">Número de plazas</label>
        <input type="number"className="form-control" id="slots" name="slots" value={eventData.slots} onChange={handleInputChange} required />
        <div className="invalid-feedback">
          Por favor, ingrese un número de plazas válido.
        </div>
      </div>

      <div className="col-12">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea className="form-control" id="description" name="description" value={eventData.description} onChange={handleInputChange} required></textarea>
        <div className="invalid-feedback">
          Por favor, ingrese una descripción válida.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="contact" className="form-label">Contacto</label>
        <input type="text" className="form-control" id="contact" name="contact" value={eventData.contact} onChange={handleInputChange} required />
          <div className="invalid-feedback">
            Por favor, ingrese datos de contacto válidos (email y/o teléfono)
          </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="company" className="form-label">Empresa / Organización</label>
        <input type="text" className="form-control" id="company" name="company" value={eventData.company} onChange={handleInputChange} required />
          <div className="invalid-feedback">
            Por favor, ingrese datos de Empresa / Organización válidos
          </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="clothes" className="form-label">Vestimenta recomendada</label>
        <input type="text" className="form-control" id="clothes" name="cloth" value={eventData.cloth} onChange={handleInputChange} />
          <div className="invalid-feedback">
            Por favor, indique si se requiere vestimenta específica.
          </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="others" className="form-label">Otros comentarios específicos de la actividad, aclaraciones sobre alergias, etc.</label>
        <input type="text" className="form-control" id="others" name="others" value={eventData.others} onChange={handleInputChange} />
          <div className="invalid-feedback">
            ¿La actividad es apta para todos?¿Ninguna aclaración?
          </div>
      </div>


      <div className="col-md-4">
        <label htmlFor="category" className="form-label">Category</label>
        <select className="form-select" id="category" name="category" value={eventData.category} onChange={handleInputChange} required>
          <option value="" disabled>Seleccione una categoría...</option>
          <option value="surf">Escuelas de surf</option>
          <option value="theater">Clases de teatro</option>
          <option value="summer_camps">Campamentos de verano</option>
          <option value="campings">Campings</option>
          <option value="water_parks">Parques acuáticos</option>
          <option value="ski_schools">Escuelas de ski/snowboard</option>
          <option value="dance">Baile</option>
          <option value="cooking">Cocina</option>
          <option value="programming">Programación</option>
          <option value="music">Música</option>
          <option value="soccer">Fútbol</option>
          <option value="other">Más actividades</option>
        </select>
        <div className="invalid-feedback">
          Por favor, seleccione una categoría para poder clasificar mejor su anuncio.
        </div>
      </div>

      <div className="col-12">
        <button className="btn btn-primary" type="submit">Publicar mi evento!</button>
        <button className="btn btn-secondary" type="button" onClick={handleTestEvents}> {/*BORRAR LUEGO!!!!!!!!*/}
          Enviar eventos de prueba
        </button>
      </div>
    </form>
  );
};