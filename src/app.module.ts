import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { MulterModule } from '@nestjs/platform-express';
import { ChatModule } from './socket/Chat.module';
import { LocationModule } from './location/location.module';
import { CartModule } from './cart/cart.module';
import { PaypalModule } from './paypal/paypal.module';
@Module({
  imports: [UserModule, ProductModule, CategoryModule, OrderModule,LocationModule,
    ConfigModule.forRoot({isGlobal:true}),
    MulterModule.register({
      dest:'./upload'
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    LoggerModule,
    MailModule,
    ChatModule,
    CartModule,
    PaypalModule
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
