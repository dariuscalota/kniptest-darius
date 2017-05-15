import React from 'react';
import { CustomersListRow } from './CustomersListRow';

export const CustomersList = ({customers, onDelete}) => {
  return (
    <table style={{backgroundColor:'white'}} className="table table-responsive">
      <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Description</th>
        <th>Balance</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {customers.map(customer => CustomersListRow({customer, onDelete}))}
      </tbody>
    </table>
  )
};
