import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InformationDTO, TypeInformation } from './dto/Information.dto';
import { Information, InformationDocument } from './schema/Information.schema';

@Injectable()
export class InformationService {
  constructor(
    @InjectModel(Information.name)
    private informationmodel:Model<InformationDocument>,
  ) {}

  async findAll(): Promise<any> {
    return await this.informationmodel.find();
  }

  async findbyUserId(userId):Promise<Information>{
    return await this.informationmodel.findOne({userId});
  }
  async create(inputs: InformationDTO): Promise<any> {
    await this.informationmodel.findOneAndDelete({userId:inputs.userId});
    return await this.informationmodel.create(inputs);
  }

  async findById(_id): Promise<any> {
    return await this.informationmodel.findOne({_id:_id});
  }

  async findSocketId(socketId):Promise<any> {
    return await this.informationmodel.findOne({socketId});
  }

  async update(
    Information: Information,
    inputs: InformationDTO,
  ): Promise<any> {
    return await this.informationmodel.findOneAndUpdate({_id:Information._id}, inputs);
  }

  async deleteById(_id): Promise<any> {
    return await this.informationmodel.findOneAndDelete({_id:_id});
  }

  async deleteByValue(value: string): Promise<any> {
    return await this.informationmodel.findOneAndDelete({value:value})
  }
}