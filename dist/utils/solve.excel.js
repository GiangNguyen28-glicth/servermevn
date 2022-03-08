"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelFile = void 0;
const common_1 = require("@nestjs/common");
const path = require('path');
const xlsx = require('xlsx');
var Excel = require('exceljs');
let ExcelFile = class ExcelFile {
    exportExcel(data, workSheetColumns, workSheetName, filePath) {
        const workBook = xlsx.utils.book_new();
        const workSheetData = [
            workSheetColumns,
            ...data
        ];
        const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
        xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
        xlsx.writeFile(workBook, path.resolve(filePath));
    }
    async exportExcel2(res) {
        var workbook = new Excel.Workbook();
        workbook.creator = 'Me';
        workbook.lastModifiedBy = 'Her';
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);
        workbook.properties.date1904 = true;
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ];
        var worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 32 },
            { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
        ];
        worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
        worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        await workbook.xlsx.write(res)
            .then(function () {
            res.end();
            console.log('File write done........');
        });
    }
    importExcel(path) {
        var workbook = xlsx.readFile(path);
        var sheet_nameList = workbook.SheetNames;
        var x = 0;
        sheet_nameList.forEach(element => {
            var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]);
            x++;
            console.log(xlData);
        });
    }
};
ExcelFile = __decorate([
    (0, common_1.Injectable)()
], ExcelFile);
exports.ExcelFile = ExcelFile;
//# sourceMappingURL=solve.excel.js.map