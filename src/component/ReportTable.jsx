import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";

const ReportTable = (props) => {
	useEffect(() => {
		generateData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.allConfirmData]);

	const [data, setData] = useState([]);

	const filterType = (data) => {
		let filterDupValue = data.filter((value, index, self) => index === self.findIndex((t) => t.type === value.type)).map((item) => {
			return {
				text: item.type,
				value: item.type,
			};
		});
		 
		return filterDupValue;
	};

	const filterTime = (data) => {
		let filterDupValue = data.filter((value, index, self) => index === self.findIndex((t) => t.time === value.time)).map((item) => {
			return {
				text: item.time,
				value: item.time,
			};
		});
		 
		return filterDupValue;
	};

	const columns = [
		{
			title: "Ticket Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Ticket Type",
			dataIndex: "type",
			key: "type",
			filters: filterType(data),
			onFilter: (value, record) => record.type.indexOf(value) === 0,
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			sorter: (a, b) => a.amount - b.amount,
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
			sorter: (a, b) => a.value - b.value,
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
            filters: filterTime(data),
			onFilter: (value, record) => record.time.indexOf(value) === 0,
		},
	];

	const generateData = () => {
		let generateData =
			props.allConfirmData.length > 0
				? props.allConfirmData.map((item, index) => {
						return {
							key: index,
							id: item.ticketId,
							type: item.ticketType,
							amount: item.totalAmount,
							value: item.totalValue,
							time: item.timeStamp,
						};
				  })
				: null;
		setData(generateData);
	};
	return (
		<div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default ReportTable;
