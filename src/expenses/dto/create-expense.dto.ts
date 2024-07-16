import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  createdDate: string;
}
