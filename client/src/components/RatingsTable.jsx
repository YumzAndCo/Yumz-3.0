import React from 'react';
import RatingStars from './RatingStars.jsx';
import '../stylesheets/ratings-table.css';

const RatingsTable = props => {

  return (
    <table id="ratings-table">
      <tbody>
        {/* ROW 1 */}
        <tr>
          <td className="rating-label">
            Overall:
          </td>
          <td className="stars">
            <RatingStars key={1} />
          </td>
        </tr>
        {/* ROW 2 */}
        <tr>
          <td className="rating-label">
            Food:
          </td>
          <td className="stars">
            <RatingStars key={2} />
          </td>
        </tr>
        {/* ROW 3 */}
        <tr>
          <td className="rating-label">
            Price:
          </td>
          <td className="stars">
            <RatingStars key={3} />
          </td>
        </tr>
        {/* ROW 4 */}
        <tr>
          <td className="rating-label">
            Service:
          </td>
          <td className="stars">
            <RatingStars key={4} />
          </td>
        </tr>
        {/* ROW 5 */}
        <tr>
          <td className="rating-label">
            Atmosphere:
          </td>
          <td className="stars">
            <RatingStars key={5} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RatingsTable;