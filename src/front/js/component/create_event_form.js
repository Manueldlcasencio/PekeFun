import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Create_event_form = () => {
  const { actions } = useContext(Context);
  const [eventData, setEventData] = useState({
    name: "", street: "", city: "", min_age: "", max_age: "", price: "", date: "", length: "", category: "", slots: "", description: "", contact: "", company: "", cloth: "", others: ""
  });
  const email = localStorage.getItem('email');
  
  /*ARRAY DE PRUEBA (EVENTS ARRAY), BORRAR LUEGO!!!!!!*/
  const eventsArray = [
  {
    name: "Fiesta de disfraces",
    street: "Calle de la Esperanza",
    city: "Madrid",
    min_age: 5,
    max_age: 12,
    price: 10,
    date: "2023-04-20",
    length: 3,
    category: "Fiestas",
    slots: 50,
    description: "Ven a divertirte en nuestra fiesta de disfraces para niños.",
    contact: "info@eventos-niños.es",
    company: "Eventos Niños",
    cloth: "Disfraz",
    others: "Traer merienda"
  },
  {
    name: "Taller de pintura",
    street: "Calle del Sol",
    city: "Barcelona",
    min_age: 6,
    max_age: 14,
    price: 15,
    date: "2023-05-10",
    length: 2,
    category: "Arte",
    slots: 20,
    description: "Aprende a pintar con acuarelas en nuestro taller de pintura para niños.",
    contact: "talleres@arte-niños.es",
    company: "Arte Niños",
    cloth: "Ropa cómoda",
    others: "Todos los materiales incluidos"
  },
  {
    name: "Clase de baile",
    street: "Calle de la Luna",
    city: "Valencia",
    min_age: 4,
    max_age: 10,
    price: 5,
    date: "2023-04-30",
    length: 1,
    category: "Danza",
    slots: 15,
    description: "Diviértete aprendiendo a bailar en nuestra clase de baile para niños.",
    contact: "info@danza-niños.es",
    company: "Danza Niños",
    cloth: "Ropa de baile",
    others: "Zapatillas de baile"
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