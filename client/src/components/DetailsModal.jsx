import React from 'react';
import RatingsTable from './RatingsTable.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';
import RatingNotes from './RatingNotes.jsx';
import '../stylesheets/details-modal.css';

const DetailsModal = props => {

  const onSaveChangesBtnClick = () => {
    // TO DO
    // Should make a request to PATCH /rating with changes
    console.log('save changes button clicked');
  };

  const newRestaurantInfo = {};
  newRestaurantInfo['googlePlaceId'] = '1234';
  newRestaurantInfo['name'] = 'The Cheesecake Factory';
  newRestaurantInfo['address'] = '3041 Stevens Creek Blvd, Santa Clara, CA 95050';
  newRestaurantInfo['category'] = 'American (Traditional), Pizza, Pasta Shops';
  newRestaurantInfo['parking'] = 'Private lot parking';
  newRestaurantInfo['hours'] = ['Sunday 10:00 AM - 5:00 PM', 'Monday 11:00 AM - 10:00 PM', 'Tuesday 11:00 AM - 10:00 PM'];
  newRestaurantInfo['menu'] = 'https://www.google.com';
  newRestaurantInfo['dress-code'] = 'Casual';
  newRestaurantInfo['reservations'] = true;
  newRestaurantInfo['delivery'] = true;
  newRestaurantInfo['credit-cards'] = true;

  // TO DO - set last edited date text
  const lastEdited = 'last edited March 6, 2023';

  if (props.show === true) {
    return (
      <div id="details-modal">
        <div id="restaurant-name">
          The Cheesecake Factory
          <span
            id="closeBtn"
            onClick={props.close}>x</span>
        </div>
        <RestaurantInfo info={newRestaurantInfo} />
        <div className="section-header">
          <span>Ratings
            <span id="last-edited-date">({lastEdited})</span>
          </span>
        </div>
        {/* TO DO - set numStarsFilled from props */}
        <RatingsTable />
        <div className="section-header">
          <span>Notes</span>
        </div>
        <RatingNotes
          clickHandler={onSaveChangesBtnClick}
          buttonText='Save Changes' />
      </div>
    );
  }
};

export default DetailsModal;