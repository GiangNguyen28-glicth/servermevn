import { Injectable } from "@nestjs/common";
const path = require('path');
const xlsx = require('xlsx');
var Excel = require('exceljs');
import { Response,Request } from "express";
@Injectable()
export class ExcelFile {
    exportExcel(data, workSheetColumns, workSheetName, filePath): any {
        const workBook = xlsx.utils.book_new();
        const workSheetData = [
            workSheetColumns,
            ...data
        ];
        const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
        xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
        xlsx.writeFile(workBook, path.resolve(filePath))
    }

    async exportExcel2(res: Response): Promise<any> {
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
        var workbook=xlsx.readFile(path);
        var sheet_nameList = workbook.SheetNames;
        var x=0;
        sheet_nameList.forEach(element => {
            var xlData=xlsx.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]);
            x++;
            console.log(xlData);
        });
    }
}