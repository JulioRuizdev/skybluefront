import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Bienvenid@</h2>
			<hr />
			<Link to={"/existing-rooms"}>Administrar Habitaciones</Link> <br />
			<Link to={"/existing-bookings"}>Administrar reservas</Link>
		</section>
	)
}

export default Admin
