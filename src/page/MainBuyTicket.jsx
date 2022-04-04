import React, { useState } from "react";
import TicketCard from "../component/TicketCard";
import { Drawer, Form, Input, notification } from "antd";
import ReportTable from "../component/ReportTable";
import { Link } from "react-router-dom";
const Ticket = [
	{
		Id: 1,
		TicketType: "A",
		TicketPrice: 5000,
		TicketLimit: 10,
		TicketMinBuy: 1,
		TicketBackgroundColor: "#FF6B6B",
	},
	{
		Id: 2,
		TicketType: "B",
		TicketPrice: 2500,
		TicketLimit: 20,
		TicketMinBuy: 2,
		TicketBackgroundColor: "#FFD93D",
	},
	{
		Id: 3,
		TicketType: "C",
		TicketPrice: 1000,
		TicketLimit: 30,
		TicketMinBuy: 2,
		TicketBackgroundColor: "#6BCB77",
	},
	{
		Id: 4,
		TicketType: "D",
		TicketPrice: 500,
		TicketLimit: 40,
		TicketMinBuy: 3,
		TicketBackgroundColor: "#4D96FF",
	},
];
const MainBuyTicket = () => {
	const [allTicket, setAllTicket] = useState(Ticket);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [ticketChoose, setTicketChoose] = useState({});
	const [ticketForConfirmOrder, setTicketForConfirmOrder] = useState({
		totalValue: 0,
		totalAmount: 0,
	});
	const [allConfirmData, setAllConfirmData] = useState([]);
    const [drawerReportVisible, setDrawerReportVisible] = useState(false)

	const onBuyTicket = (data) => { 
        setTicketForConfirmOrder({
            ...ticketForConfirmOrder,
		    totalValue: ticketForConfirmOrder.totalAmount * data.TicketPrice,
        })
		setTicketChoose(data);
		setDrawerVisible(true);
	};

	const onChooseAmount = (value) => {
		setTicketForConfirmOrder({
			totalValue: parseInt(value) * ticketChoose.TicketPrice,
			totalAmount: parseInt(value),
		});
	};

	const onComfirmOrder = () => { 
        let yourDate = new Date().toLocaleString() 
        let order = {
            ticketId : ticketChoose.Id,
            ticketType : ticketChoose.TicketType,
            totalAmount : ticketForConfirmOrder.totalAmount,
            totalValue : ticketForConfirmOrder.totalValue,
            timeStamp : yourDate
        } 
        setAllConfirmData([...allConfirmData,order])
		let checkStock = JSON.parse(JSON.stringify(allTicket)).map((item) => {
			if (item.Id === ticketChoose.Id) {
				return {
					...item,
					TicketLimit: item.TicketLimit - ticketForConfirmOrder.totalAmount,
				};
			} else {
				return item;
			}
		});
		setAllTicket(checkStock);
        setDrawerVisible(false) 
		notification["success"]({
			message: "Order Success !!",
			description: "",
		});
	};
  
	return (
		<div className="buyticket-container">
			<div className="header-bar">
				<div className="left-title">
					<span className="header-title">Online Tickets</span>
				</div>
				<div className="right-menu">
					<Link to="/">
                        <span className="right-items">Main Menu</span>
                    </Link>
					<span className="right-items" onClick={() => setDrawerReportVisible(true)}>Report</span>
				</div>
			</div>
			<div className="ticket-show-container">
				{allTicket.map((item) => {
					return (
						<TicketCard key={item.Id} ticket={item} onBuyTicket={onBuyTicket} />
					);
				})}
			</div>
			<Drawer
				title={<span className="drawer-title">Buy Tickets</span>}
				placement="right"
				onClose={() => setDrawerVisible(false)}
				visible={drawerVisible}
				size={"large"} 
			>
				<div className="drawer-container">
					<div className="ticket-preview">
						<TicketCard ticket={ticketChoose} />
					</div>
					<div className="ticket-panel"> 
						<Form
							name="basic"
							layout="vertical" 
							onFinish={onComfirmOrder} 
							style={{ height: "100%" }} 
						>
							<Form.Item
								label="Amount"
								name="amount"
								rules={[
									{ required: true, message: "Please input your username!" },
								]}
							>
								<Input
									min={ticketChoose.TicketMinBuy}
									max={ticketChoose.TicketLimit}  
                                    value={ticketForConfirmOrder.totalAmount}
									onChange={(e) => onChooseAmount(e.target.value)}
									type="number"
                                    disabled={ticketChoose.TicketLimit === 0 ? true : false}
								/>
							</Form.Item>
							<Form.Item label="Total Price" name="total_price">
								<Input
									key={Math.random()}
									defaultValue={ticketForConfirmOrder.totalValue}
									disabled
								/>
							</Form.Item>
							<Form.Item>
								<button className="btn-ticket-card" htmlType="submit">
									Buy Now
								</button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</Drawer>
            <Drawer
				title={<span className="drawer-title">Report</span>}
				placement="right"
				onClose={() => setDrawerReportVisible(false)}
				visible={drawerReportVisible}
				size={"large"} 
			>
                <div>
                    <ReportTable allConfirmData={allConfirmData} />
                </div>
            </Drawer>
		</div>
	);
};

export default MainBuyTicket;
