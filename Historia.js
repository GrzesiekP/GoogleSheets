function WCZYTAJ_KOLEJNY_MIESIAC() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const currentMonthYear = data[1][0]; // Value from A2 in format MM.YYYY
    let targetRow = -1;

    // Find the first row where the value in column B is empty
    for (let i = 0; i < data.length; i++) {
        if (data[i][1] === '') {
            targetRow = i;
            break;
        }
    }

    if (targetRow === -1) {
        SpreadsheetApp.getActive().toast('Nie znaleziono pustego wiersza w kolumnie B.');
        return;
    }

    // Extract month and year from the date in column A of the target row
    const targetDate = new Date(data[targetRow][0]);
    const targetMonthYear = `${('0' + (targetDate.getMonth() + 1)).slice(-2)}.${targetDate.getFullYear()}`;

    // Check if the month and year match
    if (targetMonthYear !== currentMonthYear) {
        SpreadsheetApp.getActive().toast('Miesiąc i rok w kolumnie A nie są zgodne z wartością z A2.');
        return;
    }

    // For columns B, C, D, E, F, J, and K, copy values from row 2 to the found row
    const columnsToCopy = [1, 2, 3, 4, 5, 6, 9, 10]; // B (Mieszkanie i media), C (Ubezpieczenia), D (Reaty kredytów), E (Samochód), F (Pozostałe), G (Podróże) J (DG), K (Podatki)

    columnsToCopy.forEach(col => {
        sheet.getRange(targetRow + 1, col + 1).setValue(data[1][col]);
    });
}