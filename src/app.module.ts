import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(
        {
          url: 'mongodb+srv://huynhduc:duc123456789@cluster0.pvxto.mongodb.net/eventmanager?retryWrites=true&w=majority',
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
