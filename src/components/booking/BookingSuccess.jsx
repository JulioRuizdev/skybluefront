import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  // Extraer solo el código de confirmación del mensaje
  const getConfirmationCode = (message) => {
    const codeMatch = message?.match(/\d+/);
    return codeMatch ? codeMatch[0] : "";
  };

  const confirmationCode = getConfirmationCode(message);

  return (
    <div className="container">
      <Header title="Estado de la Reserva" />

      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {message ? (
            <div className="card border-success">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  ¡Reserva Exitosa!
                </h3>
              </div>
              <div className="card-body">
                <div className="alert alert-info mb-4">
                  <h4 className="alert-heading">Código de Confirmación:</h4>
                  <p className="display-6 font-monospace">{confirmationCode}</p>
                </div>
                <p className="text-muted">
                  Por favor, guarde este código para futuras referencias. 
                  Lo necesitará para cualquier consulta sobre su reserva.
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-primary">
                  Volver al Inicio
                </Link>
                <Link to="/mis-reservas" className="btn btn-success">
                  Ver Mis Reservas
                </Link>
              </div>
            </div>
          ) : (
            <div className="card border-danger">
              <div className="card-header bg-danger text-white">
                <h3 className="mb-0">
                  <i className="bi bi-x-circle me-2"></i>
                  Error en la Reserva
                </h3>
              </div>
              <div className="card-body">
                <div className="alert alert-danger">
                  {error || "Ha ocurrido un error al procesar su reserva. Por favor, inténtelo nuevamente."}
                </div>
              </div>
              <div className="card-footer">
                <Link to="/buscar-habitaciones" className="btn btn-primary">
                  Intentar Nuevamente
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;