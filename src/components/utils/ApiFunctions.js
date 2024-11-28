import axios from "axios"

export const api = axios.create({
    baseURL: "http://ec2-3-145-11-214.us-east-2.compute.amazonaws.com:8080"
})

export const getHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No se encontró token de autenticación");
    }
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

/* Esta función agrega una nueva habitación a la base de datos */
export async function addRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        // Modificar los headers para manejar FormData correctamente
        const headers = getHeader();
        delete headers["Content-Type"]; // Permitir que axios establezca el boundary correcto para FormData

        const response = await api.post("/rooms/add/new-room", formData, {
            headers: headers
        });

        if (response.status === 201) {
            return true;
        }
        return false;
    } catch (error) {
        if (error.response) {
            // Error de respuesta del servidor
            if (error.response.status === 401) {
                throw new Error("No autorizado. Por favor inicie sesión nuevamente");
            }
            throw new Error(error.response.data.message || "Error al añadir habitación");
        }
        throw error;
    }
}

/* Esta función obtiene todos los tipos de habitaciones de la base de datos */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
/* Esta función obtiene todas las habitaciones de la base de datos */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

/* Esta función elimina una habitación por Id */
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}
/* Esta función actualiza una habitación */
export async function updateRoom(roomId, roomData) {
    try {
        const headers = getHeader();
        // Eliminar Content-Type para permitir que el navegador establezca el boundary correcto para FormData
        delete headers["Content-Type"];

        const response = await api.put(`/rooms/update/${roomId}`, roomData, {
            headers: headers
        });
        return response;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Error al actualizar la habitación");
        }
        throw new Error("Error de conexión al actualizar la habitación");
    }
}

/* Esta función obtiene una habitación por el id */
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

/* Esta función guarda una nueva reserva en la base de datos */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

/* Esta función obtiene todas las reservas de la base de datos */
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

/* Esta función obtiene una reserva por el código de confirmación */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}

/* Esta es la función para cancelar una reserva de usuario */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking :${error.message}`)
    }
}

/* Esta función obtiene todas las habitaciones disponibles de la base de datos con una fecha dada y un tipo de habitación */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}
        &checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result
}

/* Esta función registra un nuevo usuario */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if (error.reeponse && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}

/* Esta función inicia sesión de un usuario registrado */
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

/* Esta es la función para obtener el perfil del usuario */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* Esta es la función para eliminar un usuario */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

/* Esta es la función para obtener un solo usuario */
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* Esta es la función para obtener las reservas de usuario por el id del usuario */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}