import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';


@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService){}
  @Query(()=> String)
    async hello(){
      return 'word'
    }
    @Query(()=> [User])
    async users(){
      return this.userService.findAll()
    }

    @Query(() => User)
  async user(@Args('_id') _id: string) {
    return await this.userService.findById(_id);
  }



    @Mutation(() => User)
    async createUser(@Args('input') input:UserInput){
      return await this.userService.create(input)
    }
    @Mutation(() => Boolean)
    async updateUser(@Args('_id') _id: string,@Args('input') input: UserInput){
      return await this.userService.update(_id, input)
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('_id') _id: string){
      return await this.userService.delete(_id)
    }
}
