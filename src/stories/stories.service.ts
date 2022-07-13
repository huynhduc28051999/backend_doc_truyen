import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { RegisterDTO,  } from '@utils'
import { StoriesEntity } from '@entity'

@Injectable()
export class StoriesService {

  async register(registerDTO: RegisterDTO) {
    try {
      const { email } = registerDTO
      const storyExits = await getMongoRepository(StoriesEntity).findOne({
        where: {
          $or: [ { email }, { username: email } ]
        }
      })
      if (storyExits) throw new HttpException('story exist', HttpStatus.CONFLICT)
      // const newUser = new StoriesEntity({
      //   ...registerDTO,
		  //   password: await bcrypt.hash(registerDTO.password, 10)
      // })
      // const saveUser = await getMongoRepository(StoriesEntity).save(newUser)
      // return !!saveUser
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getUserById(_id: string) {
    try {
      const story = await getMongoRepository(StoriesEntity).findOne({ _id })
      if (!story) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
      }
      return story
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}