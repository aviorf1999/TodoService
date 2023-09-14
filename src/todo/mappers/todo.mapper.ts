import { Injectable } from '@nestjs/common';
import { Todo } from '../models/todo.model';
import { TodoDto } from '../dtos/todo.dto';

@Injectable()
export class TodoMapper {
  fromEntityToDto(todo: Todo): TodoDto {
    return {
      id: todo._id.toString(),
      text: todo.text,
      done: todo.done,
    };
  }

  fromDtoToEntity(todoDto: TodoDto): Todo {
    const todo = new Todo();
    todo.text = todoDto.text;
    todo.done = todoDto.done;
    return todo;
  }
}
