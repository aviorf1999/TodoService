import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoGateway } from './todo.gateway';
import { TodoDto } from './dtos/todo.dto';

@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService,
        private readonly todoGateway: TodoGateway
    ) { }

    @Get()
    public async getAllTodos(): Promise<TodoDto[]> {
        return this.todoService.getAllTodos();
    }

    @Get(':id')
    public async getTodoById(@Param('id') id: string): Promise<TodoDto> {
        return this.todoService.getTodoById(id);
    }

    @Post()
    public async addTodo(@Body() todoDto: TodoDto): Promise<TodoDto> {
        const newTodo = await this.todoService.addTodo(todoDto);
        this.todoGateway.server.emit('newTodo', newTodo);
        return newTodo;
    }

    @Put(':id')
    public async updateTodo(
        @Param('id') id: string,
        @Body() todoDto: TodoDto,
    ): Promise<TodoDto | null> {
        const updatedTodo = await this.todoService.updateTodo(id, todoDto);
        if (updatedTodo) {
            this.todoGateway.server.emit('updatedTodo', updatedTodo);
        }
        return updatedTodo;
    }

    @Delete(':id')
    public async deleteTodoById(@Param('id') id: string): Promise<TodoDto | null> {
        const deletedTodo = await this.todoService.deleteTodo(id);
        if (deletedTodo) {
            this.todoGateway.server.emit('deletedTodo', deletedTodo);
        }
        return deletedTodo;
    }
}
