import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>
  ) {}

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const { zoomUrl } = createMeetingDto;
    const meeting = new Meeting();
    meeting.zoomUrl = zoomUrl;
    await this.meetingRepository.save(meeting);
    return this.meetingRepository.create(meeting);
  }

  findAll(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  async findOne(id: number) {
    const found = await this.meetingRepository.findOneBy({ id });
    if (found === null) {
      throw new NotFoundException(`Id ${ id } is not found.`);
    }
    return found;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    await this.findOne(id);
    await this.meetingRepository.update(id, updateMeetingDto);
    const update = await this.findOne(id);

    return {
      data: update,
      message: `Id ${ id } has been update.`,
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.meetingRepository.delete(id);
    return {
      message: `id ${ id } has been deleted.`,
    }
  }
}
