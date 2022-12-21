import React from 'react'
import { Outlet } from 'react-router'

function Listing() {
  return (
    <div>Listing
        <Outlet />
    </div>
  )
}

export default Listing