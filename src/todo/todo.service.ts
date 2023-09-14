import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './models/todo.model';
import { TodoDto } from './dtos/todo.dto';
import { TodoMapper } from './mappers/todo.mapper';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  private readonly todoMapper: TodoMapper) {}

  public async getAllTodos(): Promise<TodoDto[]> {
    const todos = await this.todoModel.find().exec();
    return todos.map(todo => this.transformToDto(todo));
  }

  public async getTodoById(id: string): Promise<TodoDto | null> {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) return null;
    const todo = await this.todoModel.findById(id).exec();
    return this.transformToDto(todo);
  }

  public async addTodo(todoDto: TodoDto): Promise<TodoDto> {
    const newTodo = new this.todoModel(todoDto);
    await newTodo.save();
    return this.transformToDto(newTodo);
  }

  public async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto | null> {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) return null;
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todoDto, { new: true }).exec();
    return updatedTodo ? this.transformToDto(updatedTodo) : null;
  }

  public async deleteTodo(id: string): Promise<TodoDto | null> {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) return null;
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    return deletedTodo ? this.transformToDto(deletedTodo) : null;
  }

  private transformToDto(todo: Todo): TodoDto {
    return this.todoMapper.fromEntityToDto(todo);
  }
}
