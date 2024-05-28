const ExcelJS = require('exceljs');
const fs = require('fs');

function getTabArg() {
    let arg = getCommandLineArg('tab');
    if (arg != null) {
        return Number(arg);
    }
    return 1;
}

function getArgFilePath() {
    let arg = getCommandLineArg('path');
    if (arg != null) {
        return arg;
    }
    return 'assets/mapping.xlsx';
}

function getCommandLineArg(argName) {
    const arg = process.argv.find(arg => arg.startsWith(`${argName}=`));
    if (arg) {
        return arg.split('=')[1];
    }
    return null;
}

async function readFile(filePath, tab) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(tab);
    const data = [];
    worksheet.eachRow({includeEmpty: false}, (row, rowNumber) => {
        if (rowNumber < 2) {
            return;
        }
        const codePsp = getCodePsp(row);
        data.push({[codePsp]: getDataFromRow(row)});
    });
    return data;
}

function getCodePsp(row) {
    if (row.getCell(1) == null || row.getCell(1).text === '') {
        return null;
    }
    return row.getCell(1).text;
}

function getPspDescription(row) {
    return row.getCell(3).text;
}

function getOpState(row) {
    return row.getCell(4).text;
}

function getOpCode(row) {
    return row.getCell(5).text;
}

function getDataFromRow(row) {
    return {
        "description": getPspDescription(row),
        "state": getOpState(row),
        "code": getOpCode(row)
    };
}

function writeToFile(data) {
    const mergedObject = data.reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, {});
    const resultString = JSON.stringify(mergedObject, null, 2);

    const filePath = 'output/status.json';
    fs.writeFile(filePath, resultString, (err) => {
        if (err) throw err;
        console.log('Fichier output.json à jour');
    });
}

function run() {
    readFile(getArgFilePath(), getTabArg()).then((data) => {
        writeToFile(data);
    });
}

run();