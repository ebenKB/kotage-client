/* eslint-disable array-callback-return */
import Axios from 'axios';
import { GET_COUNTRIES } from '../types/countryTypes';

// eslint-disable-next-line import/prefer-default-export
export const getCountries = () => async (dispatch) => {
  // const [countries, setCountries] =  useState([]);
  const { data } = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;timezones');
  const newCountry = await data.map((d) => (
    {
      text: d.name,
      value: d.name,
      timezones: d.timezones,
    }
  ));

  return dispatch({
    type: GET_COUNTRIES,
    payload: newCountry,
  });
};
