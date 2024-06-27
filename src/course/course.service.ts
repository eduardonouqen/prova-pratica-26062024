import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const createdCourse = new this.courseModel(createCourseDto);
      return createdCourse.save();
    } catch (error) {
      console.error(error)
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      return this.courseModel.find().exec();
    } catch (error) {
      console.error(error);
    }
  }

  async update(courseId: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    try {
      const existingCourse = await this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, { new: true });
      return existingCourse;
    } catch (error) {
      console.error(error);
    }
}

  async delete(courseId: number): Promise<Course> {
    try {
      const deletedCourse = await this.courseModel.findByIdAndDelete(courseId);
      return deletedCourse;
    } catch (error) {
      console.error(error);
    }
}
}
