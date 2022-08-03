import { Module } from '@nestjs/common';
import { EmployeesModule } from '../modules/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeOrm.config';
import { ContactInfosModule } from '../modules/contact-infos/contact-infos.module';
import { TasksModule } from '../modules/tasks/tasks.module';
import { MeetingsModule } from '../modules/meetings/meetings.module';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), EmployeesModule, ContactInfosModule, TasksModule, MeetingsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
