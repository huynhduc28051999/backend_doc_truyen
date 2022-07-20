import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { ComemntEntity } from 'entity'

@Module({
    imports: [TypeOrmModule.forFeature([ComemntEntity])],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule { }