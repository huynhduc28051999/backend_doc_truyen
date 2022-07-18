import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChapperController } from './chapper.controller'
import { ChapperService } from './chapper.service'
import { StoriesEntity, ChapperEntity } from '@entity'

@Module({
    imports: [TypeOrmModule.forFeature([ChapperEntity, StoriesEntity])],
    controllers: [ChapperController],
    providers: [ChapperService],
    exports: [ChapperService]
})
export class ChapperModule { }