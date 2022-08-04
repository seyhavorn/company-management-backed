import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactInfosService {
  constructor(
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(createContactInfoDto: CreateContactInfoDto): Promise<ContactInfo> {
    const { email, phone, employeeId ,} = createContactInfoDto;
    const contactInfo = new ContactInfo();
    contactInfo.email = email;
    contactInfo.phone = phone;
    contactInfo.employeeId = employeeId;
    await this.contactInfoRepository.save(contactInfo);
    return this.contactInfoRepository.create(contactInfo);
  }

  async findAll(): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find();
  }

  async findOne(id: number): Promise<ContactInfo> {
    const found = await this.contactInfoRepository.findOneBy({ id });
    if (found === null) {
      throw new NotFoundException(`id ${ id } is not found`);
    }
    return found;
  }

  async update(id: number, updateContactInfoDto: UpdateContactInfoDto) {
    await this.findOne(id);
    await this.contactInfoRepository.update(id, updateContactInfoDto);
    const update = await this.findOne(id);
    return {
      data: update,
      message: `Id ${ id } has been update.`,
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.contactInfoRepository.delete(id);
    return {
      message: `Id ${ id } has been deleted.`,
    }
  }
}
