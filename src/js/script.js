const selectArrow = document.querySelector('.custom-select__visible-section .fa-angle-down');
const hideList = document.querySelector('.custom-select__visible-section .custom-select__list');
const selectedCurrency = document.querySelector('.custom-select__visible-section .custom-select__selected-currency');


//*************** BITCOIN ***************
const pricedataBtc = document.querySelector('.card-bitcoin .price-data');
const checkBoxBtc = document.querySelector('.card-bitcoin input[type="checkbox"]');
const allDataBtc = document.querySelectorAll('.card-bitcoin .data');
const urlBtcUsd = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';
const urlBtcEur = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR';
const urlBtcGbp = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCGBP';
const urlBtcRub = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCRUB';

//*************** ETHEREUM ***************
const pricedataEth = document.querySelector('.card-ethereum .price-data');
const checkBoxEth = document.querySelector('.card-ethereum input[type="checkbox"]');
const allDataEth = document.querySelectorAll('.card-ethereum .data');
const urlEthUsd = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHUSD';
const urlEthEur = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHEUR';
const urlEthGbp = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHGBP';
const urlEthRub = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHRUB';

//*************** LITECOIN ***************
const pricedataLtc = document.querySelector('.card-litecoin .price-data');
const checkBoxLtc = document.querySelector('.card-litecoin input[type="checkbox"]');
const allDataLtc = document.querySelectorAll('.card-litecoin .data');
const urlLtcUsd = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD';
const urlLtcEur = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCEUR';
const urlLtcGbp = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCGBP';
const urlLtcRub = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCRUB';


let linkCheck = () => {
  if (selectedCurrency.innerHTML=='USD') {
    getDataApi(urlBtcUsd);
  } else if(selectedCurrency.innerHTML=='EUR') {
    getDataApi(urlBtcEur);
  } else if(selectedCurrency.innerHTML=='GBP') {
    getDataApi(urlBtcGbp);
  } else if(selectedCurrency.innerHTML=='RUB') {
    getDataApi(urlBtcRub);
  } else {
    console.log('return');
  }
};

getDataApi(urlBtcUsd);

function getDataApi(url){
fetch(url)
    .then(response => response.json())
    .then(data => {
      let ask = data.ask;
      let price = data.changes.price;
      let percent = data.changes.percent;

      setData(ask, percent, price);
      setFirstData(price);
 });
}

let setData = (ask, percent, price) => {
  pricedataBtc.innerText = '$' + ' ' + ask;

  checkBoxBtc.addEventListener('click', () => {
    
    if (checkBoxBtc.checked) {
      allDataBtc[0].innerHTML = percent.hour + '%';
      allDataBtc[1].innerHTML = percent.day + '%';
      allDataBtc[2].innerHTML = percent.week + '%';
      allDataBtc[3].innerHTML = percent.month + '%';
    }else {
      allDataBtc[0].innerHTML = price.hour + '$';
      allDataBtc[1].innerHTML = price.day + '$'; 
      allDataBtc[2].innerHTML = price.week + '$';
      allDataBtc[3].innerHTML = price.month + '$';
    }
  }, false);
};

let setFirstData = (price) => {
  allDataBtc[0].innerHTML = price.hour + '$';
  allDataBtc[1].innerHTML = price.day + '$';
  allDataBtc[2].innerHTML = price.week + '$';
  allDataBtc[3].innerHTML = price.month + '$';
}

//*************** custon slect ***************
selectArrow.addEventListener('click', () => {
  if (hideList.style.display == 'none') {
    hideList.style.display = 'block';
  } else {
    hideList.style.display ='none';
  }
}, false);

hideList.addEventListener('click', (event) => {
  if (event.target.tagName === "LI") {
    let text = event.target.innerText;
    selectedCurrency.innerText = text;
    closeList();
    linkCheck();
    }
}, false);

let closeList = () => {
  hideList.style.display ='none';
};

//*************** end custon slect ***************