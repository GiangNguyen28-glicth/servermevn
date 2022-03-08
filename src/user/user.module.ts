import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { AtStrategy } from './JWT/at.strategy';
import { RtStrategy } from './JWT/rt.strategy';
import { Token, TokenSchema } from './schema/token.schema';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { PasswordReset, PasswordResetSchema } from './schema/password_reset';
import { ExcelFile } from 'src/utils/solve.excel';

@Module({
  imports:[
    forwardRef(() =>MailModule),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    MongooseModule.forFeature([{name:Token.name,schema:TokenSchema}]),
    MongooseModule.forFeature([{name:PasswordReset.name,schema:PasswordResetSchema}]),
    JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService,AtStrategy,RtStrategy,ExcelFile],
  exports:[UserService]
})
export class UserModule {
    
}
