import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import { UserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>){}

    async findAll(): Promise<User[]>{
      return await this.userRepository.find()
    }

    async findById(_id: string):Promise<User>{
      return await this.userRepository.findOne({_id: _id})
    }

    async create(input:UserInput): Promise<User> {
      const user = new User()
      user._id = uuid.v4()
      user.username = input.username
      user.password = input.password
      return this.userRepository.save(user)
    }

    async update(_id: string, input: UserInput):Promise<boolean>{
      const user = new User()
      user._id = _id
      user.username = input.username
      user.password = input.password
      return (await this.userRepository.save(user))? true : false
    }

    async delete (_id: string): Promise<boolean>{
      const user = new User()
      user._id = _id
      return (await this.userRepository.remove(user)) ? true: false
    }

}
