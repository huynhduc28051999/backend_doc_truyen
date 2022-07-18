import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DiscussController } from './discuss.controller'
import { DiscussService } from './discuss.service'
import { DiscussEntity, StoriesEntity } from '@entity'

@Module({
    imports: [TypeOrmModule.forFeature([DiscussEntity, StoriesEntity])],
    controllers: [DiscussController],
    providers: [DiscussService],
    exports: [DiscussService]
})
export class DiscussModule { }