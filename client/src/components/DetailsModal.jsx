import React from 'react';
import { useState } from 'react';
import RatingsTable from './RatingsTable.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';
import RatingNotes from './RatingNotes.jsx';
import '../stylesheets/details-modal.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailsModal = props => {
  const [numFilledStars, setNumFilledStars] = useState(props.rating.overall_score);
  const [textNotes, setTextNotes] = useState(props.rating.notes);

  const onStarClick = (starId) => {
    /*
    NOTE: It seems like the "hit" box of the star doesn't line up with the star
    Seems like it's to the left of the starl... not sure why??
    */
    if (starId.length) {
      const starNum = Number(starId.split('star')[1]);
      setNumFilledStars(starNum);
    } else {
      console.log('empty id');
    }
  };
  
  const stars = [];
  let filledStarsCount = 0;
  for (let i = 1; i < 11; i++) {
    let star;
    if (filledStarsCount < numFilledStars) {
      star =
        <span id={`star${i}`}
          onClickCapture={(event) => onStarClick(event.target.id)}
          className="rating-star"
          key={i}>
          <FontAwesomeIcon
            icon={faStar}
            id={`star${i}`} />
        </span>;
      filledStarsCount++;
    } 
    else {
      star =
        <span id={`star${i}`}
          onClickCapture={(event) => onStarClick(event.target.id)}
          className="rating-star"
          key={i}>
          <FontAwesomeIcon
            icon={hollowStar}
            className="rating-star"
            id={`star${i}`} />
        </span>;
    }
    stars.push(star);
  }

  const onSaveChangesBtnClick = async () => {
    // TO DO
    // Should make a request to PATCH /rating with changes /api/editRating, restId, stars, notes

    const response = await fetch('/api/editRating', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({restId: props.restaurant.restaurant_id, stars: numFilledStars, notes: textNotes})
    });
    console.log('save changes button clicked');
  };

  // const newRestaurantInfo = {};
  // newRestaurantInfo['googlePlaceId'] = '1234';
  // newRestaurantInfo['name'] = 'The Cheesecake Factory';
  // newRestaurantInfo['address'] = '3041 Stevens Creek Blvd, Santa Clara, CA 95050';
  // newRestaurantInfo['category'] = 'American (Traditional), Pizza, Pasta Shops';
  // newRestaurantInfo['price'] = '$';
  // newRestaurantInfo['hours'] = ['Sunday 10:00 AM - 5:00 PM', 'Monday 11:00 AM - 10:00 PM', 'Tuesday 11:00 AM - 10:00 PM'];
  // newRestaurantInfo['menu'] = 'https://www.google.com';
  // // newRestaurantInfo['dress-code'] = 'Casual';
  // newRestaurantInfo['reservations'] = true;
  // newRestaurantInfo['delivery'] = true;
  // newRestaurantInfo['credit_cards'] = true;

  // TO DO - set last edited date text
  const lastEdited = 'last edited March 6, 2023';

  if (props.show === true) {
    return (
      <div id="details-modal">
        <div id="restaurant-name">
          {props.restaurant.name}
          <span
            id="closeBtn"
            onClick={props.close}>x</span>
        </div>
        <RestaurantInfo info={props.restaurant} />
        <div className="section-header">
          <span>Ratings
            <span id="last-edited-date">({lastEdited})</span>
          </span>
        </div>
        {/* TO DO - set numStarsFilled from props */}
        <table id="ratings-table">
          <tbody>
            {/* ROW 1 */}
            <tr>
              <td className="rating-label">
                Yumz:
              </td>
              <td className="stars">
                <span id="rating-stars">
                  {stars}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="section-header">
          <span>Notes</span>
        </div>
        <>
          <textarea id="rating-notes"
            type="text"
            onChange = {((e) => setTextNotes(e.target.value))}
            value = {textNotes}
          />
          <button className="details-modal-button"
            onClick={onSaveChangesBtnClick}>
              Save Changes
          </button>
        </>
      </div>
    );
  }
};

export default DetailsModal;