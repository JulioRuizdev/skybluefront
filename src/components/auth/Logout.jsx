import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " Saliste de tu cuenta!" } })
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Perfil
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Salir
			</button>
		</>
	)
}

export default Logout
