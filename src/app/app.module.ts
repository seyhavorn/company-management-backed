import { Module } from '@nestjs/common';
import { EmployeesModule } from '../modules/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfosModule } from '../modules/contact-infos/contact-infos.module';
import { TasksModule } from '../modules/tasks/tasks.module';
import { MeetingsModule } from '../modules/meetings/meetings.module';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MessagesModule } from '../modules/messages/messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '../config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${ process.env.STAGE }`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    EmployeesModule,
    ContactInfosModule,
    TasksModule,
    MeetingsModule,
    UsersModule,
    AuthModule,
    MessagesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
