"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Information_schema_1 = require("./schema/Information.schema");
let InformationService = class InformationService {
    constructor(informationmodel) {
        this.informationmodel = informationmodel;
    }
    async findAll() {
        return await this.informationmodel.find();
    }
    async findbyUserId(userId) {
        return await this.informationmodel.findOne({ userId });
    }
    async create(inputs) {
        await this.informationmodel.findOneAndDelete({ userId: inputs.userId });
        return await this.informationmodel.create(inputs);
    }
    async findById(_id) {
        return await this.informationmodel.findOne({ _id: _id });
    }
    async findSocketId(socketId) {
        return await this.informationmodel.findOne({ socketId });
    }
    async update(Information, inputs) {
        return await this.informationmodel.findOneAndUpdate({ _id: Information._id }, inputs);
    }
    async deleteById(_id) {
        return await this.informationmodel.findOneAndDelete({ _id: _id });
    }
    async deleteByValue(value) {
        return await this.informationmodel.findOneAndDelete({ value: value });
    }
};
InformationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Information_schema_1.Information.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InformationService);
exports.InformationService = InformationService;
//# sourceMappingURL=Information.service.js.map