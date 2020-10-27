function GOLD_PRICE(currency) {
    // --> Sprawdź wyjaśnienie tego kodu na grzegorzpawlowski.pl <--
    // Tym razem do początkowej części url, doklejami symbol waluty, w której checmy uzyskać wynik
    // Jeśli jako currency podamy "PLN", dostaniemy url https://data-asg.goldprice.org/dbXRates/PLN
    var url = "https://data-asg.goldprice.org/dbXRates/" + currency;
    
    // Opcje, które definiują, jak kod ma wykonać poprawne zapytanie.
    var requestOptions = {
        "method": "GET",
        "followRedirects": true,
        "muteHttpExceptions": true
    };

    // Wykonanie zapytania - odpowiedź w zmiennej result.
    var result = UrlFetchApp.fetch(url, requestOptions);

    // Odpowiedź jest w formacie JSON, więc trzeba zamienić go na objekt JavaScriptowy.
    var parsedData = JSON.parse(result.getContentText());

    // Na koniec z obiektu zawierającego całą odpowiedź, wyciągam to, co mnie interesuje - cenę złota.
    var goldPrice = parsedData['items'][0]['xauPrice'];

    // I zwracam ją jako wynik funkcji
    return goldPrice;
}