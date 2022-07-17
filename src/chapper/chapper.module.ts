import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChapperController } from './chapper.controller'
import { ChapperService } from './chapper.service'
import { ChapperEntity } from 'entity/chapper.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ChapperEntity])],
    controllers: [ChapperController],
    providers: [ChapperService],
    exports: [ChapperService]
})
export class ChapperModule { }