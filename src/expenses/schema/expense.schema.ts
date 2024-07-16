import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop({ unique: true })
  id: number;

  @Prop({ unique: true })
  title: string;

  @Prop()
  amount: number;

  @Prop()
  createdDate: string;
}

const ExpenseSchema = SchemaFactory.createForClass(Expense);

export { ExpenseSchema };
