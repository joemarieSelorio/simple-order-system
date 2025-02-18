import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(email: string, password: string): Promise<User> {
    const userId = uuidv4();

    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already taken');
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    return await this.userRepository.save({
      uuid: userId,
      email,
      password: hashedPassword,
    });
  }
}
