import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne({
        select: ['id', 'name', 'password'],
        where: {
          id,
        },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async createUser(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
