import React from 'react';

const DetailsTable = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {props.details['reservations']}
          </td>
          <td>
            {props.details['menu']}
          </td>
        </tr>
        <tr>
          <td>
            {props.details['credit-cards']}
          </td>
          <td>
            {props.details['price']}
          </td>
        </tr>
        <tr>
          <td>
            {props.details['delivery']}
          </td>
          <td>
            {props.details['phone']}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailsTable;