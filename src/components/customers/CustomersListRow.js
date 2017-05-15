import React from 'react';
import { Link } from 'react-router';

export const CustomersListRow = ({customer, onDelete}) => {

  let first_name = customer.metadata.length>0 ? JSON.parse(customer.metadata).first_name : "";
  let last_name = customer.metadata.length>0 ? JSON.parse(customer.metadata).last_name : "";

  return (
    <tr key={customer.id}>
      <td>{(first_name.length>0 && last_name.length>0) ? first_name + " " + last_name : "-"}</td>
      <td>{customer.email}</td>
      <td>{customer.description}</td>
      <td>{customer.account_balance}</td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/customers/${customer.id}`} className="btn btn-primary">Edit</Link>
          <a onClick={onDelete.bind(this, customer)} className="btn btn-danger">Delete</a>
        </div>
      </td>
    </tr>
  )
};
