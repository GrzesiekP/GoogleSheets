function FUND_VALUE(fundName) {
    let url = "https://www.nntfi.pl/fundusze-inwestycyjne/fundusze-akcji/" + fundName + "?unitsCategoryId=A"
    let options =
        {
          "method"  : "GET",
          "followRedirects" : true,
          "muteHttpExceptions":true
        };
    let result = UrlFetchApp.fetch(url, options).getContentText();
    
    const pattern = '<div class="end_date_price"><span class="fund_value">'
    let startIndex = result.lastIndexOf(pattern) + pattern.length
    let newString = result.substring(startIndex)
    let endIndex = newString.indexOf(' <')
    let priceString = newString.substr(0, endIndex).replace(',','.')
    
    let price = parseFloat(priceString)
    
    return price
  }