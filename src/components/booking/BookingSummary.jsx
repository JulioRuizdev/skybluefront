import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const checkInDate = moment(booking.checkInDate)
	const checkOutDate = moment(booking.checkOutDate)
	const numberOfDays = checkOutDate.diff(checkInDate, "days")
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])

	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Resumen de Reserva</h4>
				<p>
					Nombre: <strong>{booking.guestFullName}</strong>
				</p>
				<p>
					Correo Electrónico: <strong>{booking.guestEmail}</strong>
				</p>
				<p>
					Check-in: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Check-out: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Numero de dias reservados: <strong>{numberOfDays}</strong>
				</p>

				<div>
					<h5 className="hotel-color">Numero de huespedes</h5>
					<strong>
						Adultos{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
					</strong>
					<strong>
						<p>Niños : {booking.numOfChildren}</p>
					</strong>
				</div>

				{payment > 0 ? (
					<>
						<p>
							Pago Total: <strong>${payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Reserva confirmada, redirigiendo al pago.
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Cargando...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">El Check out debe ser despues del Check in.</p>
				)}
			</div>
		</div>
	)
}

export default BookingSummary
