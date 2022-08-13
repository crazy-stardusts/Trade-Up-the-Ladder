const axios = require('axios').default
var url = "https://www.nseindia.com/api/quote-equity?symbol="
const lastPriceMap = new Map();


exports.getLastPrice = async (stockName) => {
    let url2 = url + stockName;
    await axios.get(url2)
    .then((res) => {
        // console.log(res.data.priceInfo.lastPrice)
        lastPriceMap.set(stockName, res.data.priceInfo.lastPrice);
    })
    .catch((err) => console.error(err));
    return lastPriceMap.get(stockName);
}