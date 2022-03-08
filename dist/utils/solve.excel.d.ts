import { Response } from "express";
export declare class ExcelFile {
    exportExcel(data: any, workSheetColumns: any, workSheetName: any, filePath: any): any;
    exportExcel2(res: Response): Promise<any>;
    importExcel(path: any): void;
}
