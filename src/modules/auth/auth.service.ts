import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
    })
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') { //duplicate
        throw new ConflictException('Username is already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return await this.usersRepository.save(user);
  }

  async signin(createUserDto: CreateUserDto): Promise<{ accessToken: string, }> {
    const { username, password } = createUserDto;
    const user = await this.usersRepository.findOne({
      where: {
        username
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayloadInterface = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
