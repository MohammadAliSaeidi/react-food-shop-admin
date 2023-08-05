import React, {useEffect, useState} from 'react';
import {Button, Paper} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import './OrdersList.css'
import {mockedOrdersData} from '../../mock/mockedOrdersData'
import {columnNames} from "./columnNames"
import {getUserInfo} from "../../services/webServices";

function OrdersList() {

    const [tableData, setTableData] = useState([])
    const rows = tableData ? tableData.map(rowData => {
        const fullAddress = getFullAddress(rowData.deliveryNumber, rowData.deliveryStreet, rowData.deliveryCity, rowData.deliveryState)
        const nameOfUser = getUserInfo().name

        return {
            [columnNames.id]: rowData.orderId,
            [columnNames.orderedBy]: {userId: rowData.userId, name: nameOfUser}
        }
    }) : null

    useEffect(() => {
        setTableData(mockedOrdersData)
    }, [])

    return <Paper className='paper orders-list'>
        <DataGrid
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

const tableColumns = [
    {field: columnNames.id, headerName: 'Order ID', width: 120},
    {field: columnNames.userId, headerName: 'User', width: 120},
    {field: columnNames.orderDate, headerName: 'Order Date', width: 200},
    {field: columnNames.status, headerName: 'Status', width: 150},
    {field: columnNames.totalAmount, headerName: 'Total Amount', width: 100},
    {field: columnNames.items, headerName: 'Items', width: 300},
    {
        field: columnNames.orderedBy, headerName: 'Ordered By', width: 300,
        renderCell: (params) => (
            <>
                <p>{params.name}</p>
                <p>{params.address}</p>
            </>
        ),
    }
]

function getFullAddress(deliveryNumber, deliveryStreet, deliveryCity, deliveryState) {
    let fullAddress = "";
    if (deliveryNumber) {
        fullAddress += deliveryNumber + ", ";
    }
    if (deliveryStreet) {
        fullAddress += deliveryStreet + ", ";
    }
    if (deliveryCity) {
        fullAddress += deliveryCity + ", ";
    }
    if (deliveryState) {
        fullAddress += deliveryState;
    }

    return fullAddress.trim().replace(/,$/, "");
}

export default OrdersList;