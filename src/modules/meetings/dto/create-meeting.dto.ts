import { IsNotEmpty } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty()
  zoomUrl: string;
}
