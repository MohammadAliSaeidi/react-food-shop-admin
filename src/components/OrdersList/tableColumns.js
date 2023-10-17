import {columnNames} from "./columnNames";
import React from "react";

export const tableColumns = [
	{field: columnNames.id, headerName: 'Order ID', width: 120},
	{field: columnNames.userId, headerName: 'User', width: 120},
	{field: columnNames.orderDate, headerName: 'Order Date', width: 200},
	{field: columnNames.status, headerName: 'Status', width: 150},
	{field: columnNames.totalAmount, headerName: 'Total Amount', width: 100},
	{
		field: columnNames.items, headerName: 'Items', width: 300,
		renderCell: (params) => (
			<div>
				{console.log('params.row', params.row.items)}
			</div>
		)
	},
	{
		field: columnNames.orderedBy, headerName: 'Ordered By', width: 300,
		renderCell: (params) => (
			<div>
				<p>{params.row.orderedBy.name}</p>
				<p>{params.row.orderedBy.address}</p>
			</div>
		),
	}
]