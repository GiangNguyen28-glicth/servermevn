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
exports.UserConversationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserConversation_schema_1 = require("./schema/UserConversation.schema");
let UserConversationService = class UserConversationService {
    constructor(userConversationModel) {
        this.userConversationModel = userConversationModel;
    }
    async findAll() {
        return await this.userConversationModel.find();
    }
    async create(inputs) {
        return await this.userConversationModel.create(inputs);
    }
    async findById(_id) {
        return await this.userConversationModel.findOne({ _id: _id });
    }
    async update(userConversation, inputs) {
        return await this.userConversationModel.findOneAndUpdate({ _id: userConversation._id }, inputs);
    }
    async findDataUserConversation(userId, conversationId) {
        return await this.userConversationModel.find({ userId, conversationId });
    }
    async updateLastMessageId(userConversation, last_message_id) {
        return await this.userConversationModel.findOneAndUpdate({ _id: userConversation._id }, { last_message_id });
    }
    async deleteById(_id) {
        return await this.userConversationModel.findOneAndDelete({ _id: _id });
    }
};
UserConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(UserConversation_schema_1.UserConversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserConversationService);
exports.UserConversationService = UserConversationService;
//# sourceMappingURL=UserConversation.service.js.map