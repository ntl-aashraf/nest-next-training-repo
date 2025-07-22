import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto) {
    const user = this.userRepository.create(createUserDto);
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  getAllUsers() {
    const foundUsers = this.userRepository.find();

    return foundUsers;
  }

  getActiveUsers() {
    const activeUsers = this.userRepository.find({
      where: { isActive: true },
    });
    return activeUsers;
  }
}
