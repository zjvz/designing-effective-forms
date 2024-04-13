let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        const countryInput = document.getElementById('country');
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
        getCountryByIP();

        //filtrowanie nie dziala :(
        countryInput.addEventListener('input', function() {
            const filterValue = this.value.toUpperCase();
            const options = countryInput.getElementsByTagName('option');

            for (let i = 0; i < options.length; i++) {
                const optionValue = options[i].textContent.toUpperCase();
                if (optionValue.indexOf(filterValue) > -1) {
                    options[i].style.display = '';
                } else {
                    options[i].style.display = 'none';
                }
            }
        });
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const countryName = data.country;
            const countryInput = document.getElementById('country');
            countryInput.value = countryName; // Ustawienie kraju w polu wyboru

            // Pobranie kodu kraju na podstawie nazwy
            getCountryCode(countryName);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("");
        const countryCodeInput = document.getElementById('countryCode');
        countryCodeInput.value = countryCode; // Ustawienie numeru kierunkowego
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    
    fetchAndFillCountries();
})()