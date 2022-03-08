import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';

@Module({
  imports:[],
  controllers: [PaypalController],
  providers: [PaypalService]
})
export class PaypalModule {}
