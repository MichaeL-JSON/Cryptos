import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { UserEntity } from '@app/user/entities/user.entity'
import { USER_REPOSITORY } from '@app/constants/constants'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/configs/JWT.config'
import { UserType } from '@app/user/types/user.type'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto)
    return await this.userRepository.save(newUser)
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  generateJwt(user: UserEntity): string {
    return sign({ ...user }, JWT_SECRET)
  }

  buildUserResponse(user: UserEntity): UserType & { token: string } {
    return { ...user, token: this.generateJwt(user) }
  }
}
