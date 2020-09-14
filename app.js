//DOM Handlers
const getCurrency1 = document.getElementById('getCurrency1');
const getCurrency2 = document.getElementById('getCurrency2');
const selectCurrency1 = document.getElementById('select-currency1');
const selectCurrency2 = document.getElementById('select-currency2');
let rate1, rate2; // Stores Currency Rates after Fetching

//Functions
function getRates(currency1, currency2) {
  let countryCode1 = currency1.substring(0, 2).toLowerCase();
  let imgUrlCurrency1 = `https://www.countryflags.io/${countryCode1}/flat/64.png`;
  let countryCode2 = currency2.substring(0, 2).toLowerCase();
  let imgUrlCurrency2 = `https://www.countryflags.io/${countryCode2}/flat/64.png`;
  let excURL = `https://api.exchangeratesapi.io/latest?symbols=${currency1},${currency2}&base=${currency1}`;
  axios
    .get(excURL)
    .then(function (response) {
      rate1 = parseFloat(response.data.rates[currency1]).toFixed(3);
      rate2 = parseFloat(response.data.rates[currency2]).toFixed(3);
      document.getElementById('flag1').src = imgUrlCurrency1;
      document.getElementById('flag2').src = imgUrlCurrency2;
      getCurrency1.value = 1;
      getCurrency2.value = rate1 * rate2;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function conversion(value, currencyInputField) {
  if (value == '') {
    value = 0;
  }
  if (currencyInputField == 1) {
    getCurrency2.value = (value * rate2).toFixed(3);
  } else {
    getCurrency1.value = (value / rate2).toFixed(3);
  }
}

//Events
selectCurrency1.addEventListener('change', function (event) {
  getRates(this.value, selectCurrency2.value);
});
selectCurrency2.addEventListener('change', function (event) {
  getRates(selectCurrency1.value, this.value);
});

getCurrency1.addEventListener('keyup', function () {
  conversion(parseInt(this.value), 1); // Currency Conversion with 1st Currency Selected
});
getCurrency2.addEventListener('keyup', function () {
  conversion(parseInt(this.value), 2); // Currency Conversion with 2nd Currency Selected
});

//Initialization
getRates('USD', 'CAD');
