import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Experimenta la mejor hospitalidad en <span className="hotel-color">SkyBlue Hotel</span>
					</h1>
					<h3>Ofrecemos los mejores servicios para todas tus necesidades.</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax