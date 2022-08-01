import { Module } from '@nestjs/common';
import { ContactInfosService } from './contact-infos.service';
import { ContactInfosController } from './contact-infos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo])],
  controllers: [ContactInfosController],
  providers: [ContactInfosService]
})
export class ContactInfosModule {}
