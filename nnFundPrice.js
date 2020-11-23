function FUND_VALUE(fundType, fundName) {
  fundType = fundType.trim()
  fundName = fundName.trim()
  let url = "https://www.nntfi.pl/fundusze-inwestycyjne/" + fundType + "/" + fundName + "?unitsCategoryId=K"

  let result = getHtmlTextinGS(url)
  
  const pattern = '<div class="end_date_price"><span class="fund_value">'
  let startIndex = result.lastIndexOf(pattern) + pattern.length
  let newString = result.substring(startIndex)
  let endIndex = newString.indexOf(' <')
  let priceString = newString.substr(0, endIndex).replace(',','.')
  
  let price = parseFloat(priceString)
  
  return price
}

function getHtmlText(url) {
  let response = await fetch(url) // if CORS error, use chrome plugin
  let htmlText = await response.text()

  return htmlText
}

function getHtmlTextinGS(url) {
  let options = {
    "method": "GET",
    "followRedirects": true,
    "mode": "no-cors",
    "muteHttpExceptions": true
  }

  return UrlFetchApp.fetch(url, options).getContentText();
}