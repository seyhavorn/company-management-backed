import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactInfosService } from './contact-infos.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Controller('contact-info')
export class ContactInfosController {
  constructor(private readonly contactInfoService: ContactInfosService) {}

  @Post()
  create(@Body() createContactInfoDto: CreateContactInfoDto) {
    return this.contactInfoService.create(createContactInfoDto);
  }

  @Get()
  findAll() {
    return this.contactInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactInfoDto: UpdateContactInfoDto) {
    return this.contactInfoService.update(+id, updateContactInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactInfoService.remove(+id);
  }
}
