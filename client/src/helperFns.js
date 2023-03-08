const helperFns = {};

helperFns.userCoords = {};

helperFns.getUserCoords = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(helperFns.setUserCoords);
  }
};

helperFns.setUserCoords = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  helperFns.userCoords = { latitude, longitude };
};

helperFns.retrieveUserCoords = () => {
  return helperFns.userCoords;
};

export default helperFns;