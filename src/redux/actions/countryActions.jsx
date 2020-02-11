/* eslint-disable array-callback-return */
import Axios from 'axios';
import { GET_COUNTRIES } from '../types/countryTypes';

// eslint-disable-next-line import/prefer-default-export
export const getCountries = () => async (dispatch) => {
  // const [countries, setCountries] =  useState([]);
  console.log('We want to show all the countries here...');
  const { data } = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;timezones');
  console.log('THIS IS THE DATA', data);
  const newCountry = data.map((d) => {
    const country = {
      text: d.name,
      value: d.name,
      timezones: d.timezones,
    };
    console.log(country);
  });

  console.log('These are the new countries that we have', newCountry);
  return dispatch({
    type: GET_COUNTRIES,
    payload: newCountry,
  });
};
