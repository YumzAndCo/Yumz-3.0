import React from 'react';
import Detail from './Detail.jsx';
import DetailsTable from './DetailsTable.jsx';
import '../stylesheets/details-modal.css';
import { faLocationDot, faCircleInfo, faPhone, faTruckFast, faShirt, faCar } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCreditCard, faFileLines } from '@fortawesome/free-regular-svg-icons';

const RestaurantInfo = props => {
  // console.log('RESTAURANT INFO:', props);
  const mainDetails = [];
  const details = {};
  mainDetails.push(
    <Detail
      iconName={faLocationDot}
      text={props.info.address}
      url={`https://maps.google.com/?q=${props.info.address}`}
      key={1}
    />
  );
  mainDetails.push(
    <Detail
      iconName={faCircleInfo}
      text={props.info.cuisine}
      key={2}
    />
  );
  const hoursStr = props.info.hours;
  const hoursArr = hoursStr.split(',');

  {/**
  //REGEX for making a line break in 'Hours' at any comma:
  .replace(/,\s?/gm, '\n')

  const rawStr = props.info.hours
  const hoursStr = rawStr.replace(/,\s?/gm, '\n')

   */}





  // if (Array.isArray(props.info.hours)) {
  //   props.info.hours.forEach((dayStr, index) => {
  //     if (index === props.info.hours.length - 1) {
  //       hoursStr += dayStr;
  //     } else {
  //       hoursStr += dayStr + ', ';
  //     }
  //   });
  // } else {
  //   hoursStr = 'N/A';
  // }
  mainDetails.push(
    <Detail
      iconName={faClock}
      text={hoursStr.replace(/,\s?/gm, '\n')}
      key={3}
    />
  );

  const parkingText = props.info.parking_options ? props.info.parking_options : 'N/A';
  details['parking'] =
    <Detail
      iconName={faCar}
      text={parkingText}
      key={4}
    />;

  const deliveryTxt = props.info.offers_delivery ? 'Offers delivery' : 'No delivery';
  details['delivery'] =
    <Detail
      iconName={faTruckFast}
      text={deliveryTxt}
      key={5}
    />;
  const dressCodeText = props.info.dress_code ? props.info.dress_code : 'N/A';
  details['dress-code'] =
    <Detail
      iconName={faShirt}
      text={dressCodeText}
      key={6}
    />;

  const creditCardTxt = props.info['credit-cards'] ? 'Accepts credit cards' : 'Does not accept credit cards';
  details['credit-cards'] =
    <Detail
      iconName={faCreditCard}
      text={creditCardTxt}
      key={7}
    />;

  details['menu'] =
    <Detail
      iconName={faFileLines}
      text="View menu"
      url={props.info.menu_url}
      key={8}
    />;

  const reservationsTxt = props.info.reservations ? 'Takes reservations' : 'No reservations';
  details['reservations'] =
    <Detail
      iconName={faPhone}
      text={reservationsTxt}
      key={9}
    />;
  return (
    <>
      <div className="section-header">
        <span>Info</span>
      </div>
      {mainDetails}
      <DetailsTable details={details} />
    </>

  );
};

export default RestaurantInfo;