import React from 'react'

function Overview({ credit, debit, pending}) {
  return (
    <div className='container'>
        <h2>Expense Overview</h2>
        <p>Total Credit: {credit}</p>
        <p>Total Debit: {debit}</p>
        <p>Total Pending: {pending}</p>
    </div>
  )
}

export default Overview
