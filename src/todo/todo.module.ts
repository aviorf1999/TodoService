import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from './models/todo.model';
import { TodoMapper } from './mappers/todo.mapper';
import { TodoGateway } from './todo.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoMapper, TodoGateway],
})
export class TodoModule { }
