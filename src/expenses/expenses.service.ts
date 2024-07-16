import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userNotFound } from './error';
import { IQuaryExpense } from './interface/query-expense.interface';
import { Expense } from './schema/expense.schema';
import { CreateSuccess, UpdateSuccess, DeleteSuccess } from './success-mesages';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expensesModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const counData = await this.expensesModel.countDocuments();
    const user = await this.expensesModel.create(createExpenseDto);
    user.id = counData + 1;
    user.save();
    return { message: CreateSuccess, data: user };
  }

  findAll(
    queryParams: IQuaryExpense = {
      page: '1',
      perPage: '1',
    },
  ) {
    const page = parseInt(queryParams.page);
    const limit = parseInt(queryParams.perPage);
    return this.expensesModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: string): Promise<Expense> {
    const user = await this.expensesModel.findOne({ id: id }).exec();
    if (!user) {
      throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const updatedUser = await this.expensesModel
      .findOneAndUpdate({ id: id }, updateExpenseDto)
      .exec();
    if (!updatedUser) {
      throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
    }
    return {
      message: UpdateSuccess,
      data: updatedUser,
    };
  }

  async remove(id: number) {
    const removedUser = await this.expensesModel
      .findOneAndDelete({ id: id })
      .exec();
    if (!removedUser) {
      throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
    }
    return {
      message: DeleteSuccess,
      data: removedUser,
    };
  }
}
