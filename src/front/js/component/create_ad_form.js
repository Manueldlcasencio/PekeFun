
import React, { useContext } from "react";
import { Context } from "../store/appContext";


const Anunciante = () => {
    const { store, actions } = useContext(Context);
  
    return (
      <div className="anunciante-container">
        <h1>¡Bienvenido, anunciante!</h1>
        <form>
          <input type="text" placeholder="Título del anuncio" />
          <textarea placeholder="Descripción del anuncio"></textarea>
          <button type="submit">Publicar anuncio</button>
        </form>
      </div>
    );
  };
  
  export default Anunciante;  