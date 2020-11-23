function FUND_PRICE(fundType, fundName) {
  // --> Sprawdź wyjaśnienie tego kodu na grzegorzpawlowski.pl <--
  
  // Przygotowuję URL
  fundType = fundType.trim()
  fundName = fundName.trim()
  const url = "https://www.nntfi.pl/fundusze-inwestycyjne/" + fundType + "/" + fundName + "?unitsCategoryId=K"

  // Pobieram kod HTML strony
  const result = getHtmlTextinGS(url)
  
  // Magia z wyciąganiem ceny z HTML-a (pozwolę sobie nie wyjaśniać)
  const pattern = '<div class="end_date_price"><span class="fund_value">'
  const startIndex = result.lastIndexOf(pattern) + pattern.length
  const newString = result.substring(startIndex)
  const endIndex = newString.indexOf(' <')
  const priceString = newString.substr(0, endIndex).replace(',','.')
  
  // Konwertuję tekst na liczbę, którą zwracam
  const price = parseFloat(priceString)
  
  return price
}

function getHtmlText(url) {
  const response = await fetch(url) // if CORS error, use chrome plugin
  const htmlText = await response.text()

  return htmlText
}

function getHtmlTextinGS(url) {
  const options = {
    "method": "GET",
    "followRedirects": true,
    "mode": "no-cors",
    "muteHttpExceptions": true
  }

  return UrlFetchApp.fetch(url, options).getContentText();
}