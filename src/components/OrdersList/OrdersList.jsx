import {useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import './OrdersList.css'
import {getItemInfo, getTableData, getUserInfo} from "../../services/webServices";
import {tableColumns} from "./tableColumns";
import {columnNames} from "./columnNames";

function OrdersList() {
	const [tableData, setTableData] = useState([])
	const [rows, setRows] = useState([{
		[columnNames.id]: '1252345',
		[columnNames.orderedBy]: {name: 'test name', address: 'fullAddress'}
	}])
	const apiRef = useGridApiRef();

	useEffect(() => {
		const abortController = new AbortController()
		const prepareRows = async () => {
			try {
				const tableData = await getTableData(0, 10, abortController)

				if (!abortController.signal.aborted && tableData.data.orders) {
					setTableData(tableData.data.orders)

					updateRowsData(tableData.data.orders, abortController, apiRef)
				}
			} catch (error) {
				if (error.name === 'CanceledError') {
					console.log('Request of fetching the orders list data was aborted.');
				} else {
					console.error('Error fetching orders list data:', error);
				}
			}
		}

		prepareRows()

		return () => {
			abortController.abort()
		}

	}, [])


	return <Paper className='paper orders-list'>
		<DataGrid
			apiRef={apiRef}
			sx={{minHeight: '100%'}}
			initialState={{
				pagination: {paginationModel: {pageSize: 5}}
			}}
			className='orders-table'
			columns={tableColumns}
			rows={rows}
			checkboxSelection
			disableRowSelectionOnClick
			pageSizeOptions={[5, 10, 25]}
		/>
	</Paper>
}

function updateRowsData(ordersData, abortController, apiRef) {
	console.log('ordersData', ordersData)
	ordersData.map(async (orderData) => {
		const userInfo = await getUserInfo(orderData.userId, abortController)
		const orderItems = await fetchOrderItemsData(orderData.items)
		const orderItemNames = orderItems.map(item => {
			const {name} = item
			return name
		})
		console.log('orderItemNames', orderItemNames)
		const nameOfUser = userInfo.name
		const fullAddress = getFullAddress(
			orderData.deliveryNumber,
			orderData.deliveryStreet,
			orderData.deliveryCity,
			orderData.deliveryState)

		apiRef.current.updateRows([{
			[columnNames.id]: orderData.id,
			[columnNames.userId]: orderData.userId,
			[columnNames.orderDate]: orderData.orderDate,
			[columnNames.status]: orderData.status,
			[columnNames.totalAmount]: orderData.totalAmount,
			[columnNames.items]: orderData.items,
			[columnNames.orderedBy]: {name: nameOfUser, address: fullAddress},
		}])
	})
}

async function fetchOrderItemsData(items) {
	const itemsDataPromises = items.map(async (item) => {
		const result = await getItemInfo(item.id);
		return result.data;
	});

	return await Promise.all(itemsDataPromises)
}

function getFullAddress(deliveryNumber, deliveryStreet, deliveryCity, deliveryState) {
	let fullAddress = ""
	if (deliveryNumber) {
		fullAddress += deliveryNumber + ", "
	}
	if (deliveryStreet) {
		fullAddress += deliveryStreet + ", "
	}
	if (deliveryCity) {
		fullAddress += deliveryCity + ", "
	}
	if (deliveryState) {
		fullAddress += deliveryState
	}

	return fullAddress.trim().replace(/,$/, "")
}

export default OrdersList