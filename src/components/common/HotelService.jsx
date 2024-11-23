import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaCocktail,
	FaParking,
	FaSnowflake,
	FaTshirt,
	FaUtensils,
	FaWifi
} from "react-icons/fa"

const HotelService = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Nuestros Servicios"} />

				<Row className="mt-4">
					<h4 className="text-center">
						Servicios de <span className="hotel-color"> SkyBlue - </span>Hotel
						<span className="gap-2">
							<FaClock className="ml-5" /> Atención 24/7
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Mantente conectado durante tu estancia con nuestro servicio de WiFi gratuito.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaUtensils /> Desayuno
								</Card.Title>
								<Card.Text>Comienza tu día con un delicioso buffet de desayuno.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaTshirt /> Lavandería
								</Card.Title>
								<Card.Text>Mantén tu ropa limpia y fresca con nuestro servicio de lavandería.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaCocktail /> Mini-bar
								</Card.Title>
								<Card.Text>Disfruta de una bebida refrescante o un snack de nuestro mini-bar en la habitación.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaParking /> Estacionamiento
								</Card.Title>
								<Card.Text>Estaciona tu coche cómodamente en nuestro aparcamiento en el lugar.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaSnowflake /> Aire acondicionado
								</Card.Title>
								<Card.Text>Mantente fresco y cómodo con nuestro sistema de aire acondicionado.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default HotelService
