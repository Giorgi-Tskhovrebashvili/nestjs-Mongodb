import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://giocxovrebashvili:homework-mongodb@homework-mongodib.lkk2t1t.mongodb.net/',
    ),
    ExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
