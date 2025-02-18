import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hasSamePassword = await bcrypt.compare(password, user.password);

    if (!hasSamePassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign(
      { uuid: user.uuid },
      process.env.API_SECRET as string,
      {
        expiresIn: 86400,
      },
    ) as string;

    return {
      token,
    };
  }
}
