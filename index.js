const xlsx = require('xlsx');
const fs = require('fs');

var tab = 0;
var args = process.argv.slice(2);
if (args[0] !== undefined) {
    tab = args[0];
}

const excelData = readFile(tab);
const transformedData = transform(excelData);
writeToFile(transformedData);

function readFile(tab) {
    const workbook = xlsx.readFile('assets/mapping.xlsx');

    const sheetName = workbook.SheetNames[tab];
    const worksheet = workbook.Sheets[sheetName];

    return xlsx.utils.sheet_to_json(worksheet);
}

function transform(excelData) {
    let count = 0;
    return excelData.map(row => {
        count++;
        return `"${row['Code erreur Paybox']}": { "description": "${row['Description']}", "state": "${row['Statut']}", "code": "${row['Code']}" }`;
    });
}

function writeToFile(transformedData) {
    let dataToWrite = JSON.stringify(transformedData, null, 2).replace(/['`]/g, "").replace(/[\[]/g, "{").replace(/[\]]/g, "}")
        .replace(/\\/g, "").replace(/\""/g, "\"").replace(/}"/g, "}")
    const filePath = 'output/status.json';
    fs.writeFile(filePath, dataToWrite, (err) => {
        if (err) throw err;
        console.log('Fichier output.json à jour');
    });
}