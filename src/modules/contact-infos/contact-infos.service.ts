import { Injectable } from '@nestjs/common';
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
    const { email, employeeId } = createContactInfoDto;
    const contactInfo = new ContactInfo();
    contactInfo.email = email;
    contactInfo.employeeId = employeeId;
    await this.contactInfoRepository.save(contactInfo);
    return this.contactInfoRepository.create(contactInfo);
  }

  findAll() {
    return `This action returns all contactInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${ id } contactInfo`;
  }

  update(id: number, updateContactInfoDto: UpdateContactInfoDto) {
    return `This action updates a #${ id } contactInfo`;
  }

  remove(id: number) {
    return `This action removes a #${ id } contactInfo`;
  }
}
