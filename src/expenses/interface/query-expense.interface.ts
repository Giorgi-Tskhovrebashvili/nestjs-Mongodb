import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IQuaryExpense {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  page: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  perPage: string;
}
