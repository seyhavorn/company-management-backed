import { IsNotEmpty } from 'class-validator';

export class CreateContactInfoDto {
  @IsNotEmpty()
  email: string;

  phone: string;

  @IsNotEmpty()
  employeeId: number;
}
