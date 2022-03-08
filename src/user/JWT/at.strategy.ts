import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from '../schema/user.schema';
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User.name) private usermodel:Model<UserDocument>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AT_SECRET,
      signOptions: {
        expiresIn: `${60*60}s`,
      },
    });
  }

  async validate(payload: any) {
    const user = await this.usermodel.findOne({ _id: payload._id });
    if (!user) {
      throw new HttpException("Token warning !!",HttpStatus.BAD_REQUEST);
    }
    return payload;
  }
}