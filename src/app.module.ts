import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { StoriesModule } from 'stories/stories.module'
import { ChapperModule } from 'chapper/chapper.module'
import { DiscussModule } from 'discuss/discuss.module'

@Module({
  imports: [
    UserModule,
    StoriesModule,
    ChapperModule,
    DiscussModule,
    TypeOrmModule.forRoot(
        {
          url: 'mongodb+srv://huynhduc:duc123456789@cluster0.pvxto.mongodb.net/doctruyen',
          // url: 'mongodb://localhost:27017/eventmanage',
          type: "mongodb",
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          synchronize: true,
          useNewUrlParser: true,
          logging: true,
          useUnifiedTopology: true
        }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
