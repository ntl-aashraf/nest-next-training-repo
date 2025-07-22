import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('tasks')
  fetchAllTasks() {
    return this.taskService.fetchAllTasks();
  }

  @Get('active')
  getActiveTasks() {
    return this.taskService.fetchActiveTasks();
  }

  @Get('user/:id')
  fetchTasksByUserId(@Param('id') userId: string | number) {
    return this.taskService.fetchAllTasksWithUserId(userId);
  }

  @Get('user/pending/:id')
  fetchPendingTasksByUserId(@Param('id') userId: string | number) {
    return this.taskService.fetchPendingTasksWithUserId(userId);
  }

  @Get('pending/:id')
  fetchPendingTasks(@Param('id') id: number) {
    return this.taskService.fetchPendingTasks(id);
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Delete('deleteTask/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Put('updateTask/:id')
  updateTask(@Param('id') id: number) {
    return this.taskService.updateTask(id);
  }
}
