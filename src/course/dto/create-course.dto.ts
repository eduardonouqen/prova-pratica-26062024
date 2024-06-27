import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
    
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
  
}
