// https://apiv2.bitcoinaverage.com/#permissions

// pay access: 
//https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD,EUR,GBP,RUB

const arrowButton = document.querySelector('.custom-select__visible-section .arrow-button');
const currencyMenuList = document.querySelector('.custom-select__visible-section .custom-select__list');
const selectedCurrency = document.querySelector('.custom-select__visible-section .custom-select__selected-currency');
const changeCurrencyMenu = document.querySelector('.custom-select__visible-section');


const changeColorData = document.querySelectorAll('.changeable-data .data');
const checkboxState = document.querySelectorAll('.checkbox input');

const mainUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
 

//*************** BITCOIN ***************
const pricedataBtc = document.querySelector('.card-bitcoin .price-data');
const checkBoxBtc = document.querySelector('.card-bitcoin input[type="checkbox"]');
const nodeListBtc = document.querySelectorAll('.card-bitcoin .data');
const BTC_USD = mainUrl +'BTCUSD';
const BTC_EUR = mainUrl +'BTCEUR';
const BTC_GBP = mainUrl +'BTCGBP';
const BTC_UAH = mainUrl +'BTCUAH';

//*************** LITECOIN ***************
const pricedataLtc = document.querySelector('.card-litecoin .price-data');
const checkBoxLtc = document.querySelector('.card-litecoin input[type="checkbox"]');
const nodeListLtc = document.querySelectorAll('.card-litecoin .data');
const LTC_USD = mainUrl +'LTCUSD';
const LTC_EUR = mainUrl +'LTCEUR';
const LTC_GBP = mainUrl +'LTCGBP';
const LTC_UAH = mainUrl +'LTCUAH';

//*************** ETHEREUM ***************
const pricedataEth = document.querySelector('.card-ethereum .price-data');
const checkBoxEth = document.querySelector('.card-ethereum input[type="checkbox"]');
const nodeListEth = document.querySelectorAll('.card-ethereum .data');
const ETH_USD = mainUrl +'ETHUSD';
const ETH_EUR = mainUrl +'ETHEUR';
const ETH_GBP = mainUrl +'ETHGBP';
const ETH_UAH = mainUrl +'ETHUAH';

const convertCurencySymbol = {
  USD: "$",
  EUR: "€", 
  GBP: "£",
  UAH: "₴",
};

const percentSymbol = "%";

const status = (response) => {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response)
};

const json = (response) => {
  return response.json()
};

let getDataBtc = (url) => {
  fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      const {ask, display_symbol:curSymbol, changes: {price, percent}} = data;
     
      displayDataBtc(ask, percent, price, curSymbol);
    })
    .catch(error => console.error("ERROR:", error))
};

let getDataLtc = (url) => {
  fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      const {ask, display_symbol:curSymbol, changes: {price, percent}} = data;
     
      displayDataLtc(ask, percent, price, curSymbol);
    })
    .catch(error => console.error("ERROR:", error))
};

let getDataEth = (url) => {
  fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      const {ask, display_symbol:curSymbol, changes: {price, percent}} = data;
     
      displayDataEth(ask, percent, price, curSymbol);
    })
    .catch(error => console.error("ERROR:", error))
};

document.addEventListener("DOMContentLoaded", () => {
  getDataBtc(BTC_USD);
  getDataLtc(LTC_USD); 
  getDataEth(ETH_USD); 
});

//checked currency
const currencySelection = () => {
  if (selectedCurrency.innerHTML==='USD') {
    getDataBtc(BTC_USD); 
    getDataLtc(LTC_USD); 
    getDataEth(ETH_USD); 
  } else if(selectedCurrency.innerHTML==='EUR') {
    getDataBtc(BTC_EUR);
    getDataLtc(LTC_EUR);
    getDataEth(ETH_EUR);
  } else if(selectedCurrency.innerHTML==='GBP') {
    getDataBtc(BTC_GBP);
    getDataLtc(LTC_GBP);
    getDataEth(ETH_GBP);
  } else if(selectedCurrency.innerHTML=='UAH') {
    getDataBtc(BTC_UAH);
    getDataLtc(LTC_UAH);
    getDataEth(ETH_UAH);
  } else {
    console.log('return');
    return
  }
};

const defineSymbol = (currencySymbol) => {
  let selectCurencySymbol = '';

  for (let key in convertCurencySymbol) {
    if(currencySymbol.slice(4) === key) {
      selectCurencySymbol = convertCurencySymbol[key]
    }
  }
  return selectCurencySymbol
};

const setPriceData = (nodeList, price, setCurencySymbol) => {
  let priceArr = Object.keys(price).map((key) => {
    return [price[key]];
  });
 
  for (let i = 0; i < nodeList.length; i++) {
    let element = nodeList[i];

    for (let j = 0; j < priceArr.length; j++) {
      element.innerHTML = priceArr[i] + setCurencySymbol;
    }
  }
};

const setPercentData = (nodeList, percent, percentSymbol) => {
  let percentArr = Object.keys(percent).map((key) => {
    return [percent[key]];
  });
 
  for (let i = 0; i < nodeList.length; i++) {
    let element = nodeList[i];

    for (let j = 0; j < percentArr.length; j++) {
      element.innerHTML = percentArr[i] + percentSymbol;
    }
  }
};

const displayDataBtc = (ask, percent, price, currencySymbol) => { 
  let setCurencySymbol = defineSymbol(currencySymbol);
  pricedataBtc.innerText = setCurencySymbol + ' ' + ask;

  //init:
  setPriceData(nodeListBtc, price, setCurencySymbol);
  changeColor();

  checkBoxBtc.addEventListener('click', () => {
    if (checkBoxBtc.checked) {
      setPercentData(nodeListBtc, percent, percentSymbol);
    } else {
      setPriceData(nodeListBtc, price, setCurencySymbol);
    }
  }, false);
};

const displayDataLtc = (ask, percent, price, currencySymbol) => {
  let setCurencySymbol = defineSymbol(currencySymbol);
  pricedataLtc.innerText = setCurencySymbol + ' ' + ask;
  
  //init:
  setPriceData(nodeListLtc, price, setCurencySymbol);
  changeColor();

  checkBoxLtc.addEventListener('click', () => {
    if (checkBoxLtc.checked) {
      setPercentData(nodeListLtc, percent, percentSymbol);
    } else {
      setPriceData(nodeListLtc, price, setCurencySymbol);
    }
  }, false);
};

const displayDataEth = (ask, percent, price, currencySymbol) => {
  let setCurencySymbol = defineSymbol(currencySymbol);
  pricedataEth.innerText = setCurencySymbol + ' ' + ask;
  
  //init:
  setPriceData(nodeListEth, price, setCurencySymbol);
  changeColor();

  checkBoxEth.addEventListener('click', () => {
    if (checkBoxEth.checked) {
      setPercentData(nodeListEth, percent, percentSymbol);
    } else {
      setPriceData(nodeListEth, price, setCurencySymbol);
    }
  }, false);
};


//*************** change backlight for data ***************
const changeColor = () => {
  changeColorData.forEach((item) => {
    let i = Number(item.textContent.slice(0, -1));
      if( i < 0 ) { item.classList.add('text-red') }
  })
};


//activate menu
changeCurrencyMenu.addEventListener('click', (event) => {
  
  currencyMenuList.classList.toggle('open-menu');
  
  if (event.target.tagName === "LI") {
    let text = event.target.innerText;
    selectedCurrency.innerText = text;
    currencySelection();
  }

  if (currencyMenuList.classList.contains('open-menu')) {
    arrowButton.classList.add('fa-angle-up');
    arrowButton.classList.remove('fa-angle-down');
  } else {
    arrowButton.classList.add('fa-angle-down');
    arrowButton.classList.remove('fa-angle-up');
  }
  checkboxDisable();
})

const checkboxDisable = () => {
  checkboxState.forEach((item) => {
    item.checked = false;
  })
};
