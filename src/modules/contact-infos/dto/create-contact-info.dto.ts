import { IsNotEmpty } from 'class-validator';

export class CreateContactInfoDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  employeeId: number;
}
