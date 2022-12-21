import React from 'react'
import { Link } from 'react-router-dom'
import Categories from '../components/Categories'

function Dashboard() {
    return (
        <div>Dashboard -
            <h2>This is the dashboard</h2>
            <br />
            <Link to="/listing/create" >
                <h3>Create Listing</h3>
            </Link>
            <Categories />
            <br />
            
            
        </div>
    )
}

export default Dashboard