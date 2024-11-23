import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setRoom({ ...room, photo: selectedImage });
      // Crear URL temporal para la nueva imagen
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
      // Limpiar la URL existente ya que se seleccionó una nueva imagen
      setExistingImageUrl("");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom({
          roomType: roomData.roomType,
          roomPrice: roomData.roomPrice,
          photo: null // Inicialmente null ya que la foto existente se maneja por separado
        });
        
        // Guardamos la URL de la imagen existente
        if (roomData.photo) {
          // Si la imagen viene en base64
          if (roomData.photo.startsWith('data:image')) {
            setExistingImageUrl(roomData.photo);
          } else {
            // Si es una URL normal
            setExistingImageUrl(`http://localhost:9192/rooms/image/${roomId}`);
          }
        }
      } catch (error) {
        setErrorMessage("Error al cargar los datos de la habitación");
        console.error(error);
      }
    };

    fetchRoom();

    // Limpieza de URLs temporales al desmontar el componente
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!room.roomType || !room.roomPrice) {
      setErrorMessage("Por favor complete todos los campos requeridos");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomType", room.roomType);
      formData.append("roomPrice", room.roomPrice);
      
      if (room.photo) {
        formData.append("photo", room.photo);
      }

      const response = await updateRoom(roomId, formData);
      
      if (response.status === 200) {
        setSuccessMessage("¡Habitación actualizada exitosamente!");
        setTimeout(() => {
          navigate("/existing-rooms");
        }, 2000);
      } else {
        throw new Error("Error al actualizar la habitación");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar la habitación");
      console.error("Error updating room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Editar Habitación</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Tipo
              </label>
              <input
                type="text"
                className="form-control"
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
                accept="image/*"
              />
              {/* Mostrar la imagen de preview */}
              {(imagePreview || existingImageUrl) && (
                <div className="mt-3">
                  <img
                    src={imagePreview || existingImageUrl}
                    alt="Room preview"
                    style={{ 
                      maxWidth: "100%", 
                      height: "auto",
                      maxHeight: "300px",
                      objectFit: "contain" 
                    }}
                    className="img-thumbnail"
                  />
                </div>
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to={"/existing-rooms"} className="btn btn-outline-info">
                Atrás
              </Link>
              <button 
                type="submit" 
                className="btn btn-outline-warning"
                disabled={isLoading}
              >
                {isLoading ? "Actualizando..." : "Editar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;