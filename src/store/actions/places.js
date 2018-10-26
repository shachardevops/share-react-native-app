import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};
export const addPlace = (name, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      .then(token => {
        authToken = token;
        return fetch(
          'https://us-central1-placesproject-1540104385139.cloudfunctions.net/storeImage',
          {
            method: 'POST',
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        );
      })

      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedResponse => {
        const placeData = {
          name,
          location,
          image: parsedResponse.imageUrl,
          imagePath: parsedResponse.imagePath
        };
        return fetch(
          `https://placesproject-1540104385139.firebaseio.com/places.json?auth=${authToken}`,
          {
            method: 'POST',
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedResponse => {
        console.log(parsedResponse);
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');

        dispatch(uiStopLoading());
      });
  };
};
export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};
export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          `https://placesproject-1540104385139.firebaseio.com/places/.json?auth=${token}`
        );
      })
      .catch(() => {
        alert('No valid token found');
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert('Something went wrong, sorry :/');
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places
  };
};
export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          `https://placesproject-1540104385139.firebaseio.com/places/${key}.json?=auth=${token}`,
          {
            method: 'DELETE'
          }
        );
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedResponse => {
        console.log('Done');
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key
  };
};
