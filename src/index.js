
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


function clearData(output) {
  output.innerHTML = '';
} 
function countries(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);

    console.log(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length <= 10  && data.length > 1 ) {
    clearData(countryList);
    clearData(countryInfo);

    return (countryList.innerHTML = data
      .map(
        country =>`<li class = 'country'>
                        <img src = '${country.flags.svg}' width = "100px" />
                        <p>${country.name}</p>
                    </li> `
      )
      .join(''));
  } else {
    clearData(countryList);
    clearData(countryInfo);

    return (countryInfo.innerHTML = data
      .map(
        country => `<img src = '${country.flags.svg}' width = "100px" />
                            <h2>${country.name}</h2>
                            <p>Capital: ${country.capital}</p>
                            <p>Population:  ${country.population.toLocaleString()}</p>
                            <p>Languages:  ${country.languages[0].name}</p>`)
      .join(''));
  }
}
const searchCountry = e => {
  const search = searchBox.value.trim();

  fetchCountries(search)
    .then(data => {
      countries(data);
    })
    .catch(error => {
      if (search !== '') {
       console.log('Oops, there is no country with that name');
      }
    });
};

searchBox.addEventListener('input', searchCountry);


  