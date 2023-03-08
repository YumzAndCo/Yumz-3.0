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
            {props.details['dress-code']}
          </td>
        </tr>
        <tr>
          <td>
            {props.details['delivery']}
          </td>
          <td>
            {props.details['parking']}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailsTable;