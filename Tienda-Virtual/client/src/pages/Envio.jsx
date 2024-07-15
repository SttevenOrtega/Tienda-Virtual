import React from "react";


const Envio = () => {
  return (
    <main>
      <section>
        <h2>Envío</h2>

        <div className="contenedor__envio">
          <form className="formulario__envio">
            <fieldset>
              <legend>Datos para el envío</legend>
              <div className="campo">
                <label>Correo electrónico:</label>
                <input type="email" id="correo" name="correo" className="input-text" />
              </div>

              <div className="campo checkbox">
                <label>Enviarme novedades y ofertas por correo electrónico:</label>
                <input type="checkbox" id="novedades" name="novedades" />
              </div>

              <div className="contenedor-campos">
                <div className="campo">
                  <label>País:</label>
                  <input type="text" id="pais" name="pais" className="input-text" />
                </div>

                <div className="campo">
                  <label>Región:</label>
                  <input type="text" id="region" name="region" className="input-text" />
                </div>

                <div className="campo">
                  <label>Nombre:</label>
                  <input type="text" id="nombre" name="nombre" className="input-text" />
                </div>

                <div className="campo">
                  <label>Apellidos:</label>
                  <input type="text" id="apellidos" name="apellidos" className="input-text" />
                </div>

                <div className="campo">
                  <label>Número de cédula:</label>
                  <input type="text" id="cedula" name="cedula" className="input-text" />
                </div>

                <div className="campo">
                  <label>Dirección:</label>
                  <input type="text" id="direccion" name="direccion" className="input-text" />
                </div>

                <div className="campo">
                  <label>Referencias adicionales de dirección:</label>
                  <input type="text" id="referencias" name="referencias" className="input-text" />
                </div>

                <div className="campo">
                  <label>Ciudad:</label>
                  <input type="text" id="ciudad" name="ciudad" className="input-text" />
                </div>

                <div className="campo">
                  <label htmlFor="departamento">Departamento:</label>
                  <input type="text" id="departamento" name="departamento" className="input-text" />
                </div>

                <div className="campo">
                  <label>Código postal:</label>
                  <input type="text" id="codigo_postal" name="codigo_postal" className="input-text" />
                </div>

                <div className="campo">
                  <label>Teléfono:</label>
                  <input type="tel" id="telefono" name="telefono" className="input-text" />
                </div>
              </div>

              <div className="campo checkbox">
                <label>Guardar mi información y consultar más rápidamente la próxima vez:</label>
                <input type="checkbox" id="guardar_informacion" name="guardar_informacion" />
              </div>

              <div className="alinear-derecha flex">
                <input className="boton w-sm-100" type="submit" value="Continuar" />
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Envio;
