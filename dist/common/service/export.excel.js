"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel = void 0;
const common_1 = require("@nestjs/common");
const path = require('path');
const xlsx = require('xlsx');
let Excel = class Excel {
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
};
Excel = __decorate([
    (0, common_1.Injectable)()
], Excel);
exports.Excel = Excel;
//# sourceMappingURL=export.excel.js.map