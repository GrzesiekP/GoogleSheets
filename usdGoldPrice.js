function GOLD_PRICE() {
    // --> Sprawdź wyjaśnienie tego kodu na grzegorzpawlowski.pl <--
    // Link do danych. Spróbuj wkleić go w przeglądarce, żeby zobaczyć, co zwraca.
    var url = "https://data-asg.goldprice.org/dbXRates/USD";
    
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