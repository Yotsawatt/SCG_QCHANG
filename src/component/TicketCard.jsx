import React from "react";

const TicketCard = ({ ticket, onBuyTicket }) => {
	return (
		<div
			className="ticket-card-container"
			onClick={ticket.TicketLimit > 0 ? () => onBuyTicket(ticket) : null}
			style={{ backgroundColor: ticket.TicketBackgroundColor }}
		>
			<div className="ticket-image-box">
				<img
					src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
					alt=""
				/>
			</div>
			<div className="ticket-info-box">
				<span className="ticket-type-title">{ticket.TicketType}</span>
				<span className="ticket-price">price : {ticket.TicketPrice}</span>
				{ticket.TicketLimit > 0 ? (
					<button className="btn-ticket-card">Buy Now</button>
				) : (
					<span className="sold-out-text">Sold Out</span>
				)}
			</div>
		</div>
	);
};

export default TicketCard;
