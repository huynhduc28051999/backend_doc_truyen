import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { StoriesModule } from 'stories/stories.module'

@Module({
  imports: [
    UserModule,
    StoriesModule,
    TypeOrmModule.forRoot(
        {
          url: 'mongodb+srv://huynhduc:duc123456789@cluster0.pvxto.mongodb.net/doctruyen?retryWrites=true&w=majority',
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
