import React from 'react';
import './DashboardPage.css'
import OrdersList from "../../components/OrdersList";

function DashboardPage() {
    return <div className='full-bg dashboard-page'>
        <OrdersList/>
    </div>
}

export default DashboardPage;