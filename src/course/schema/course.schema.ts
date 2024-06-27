import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop()
  value: number;

  @Prop()
  duration: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);