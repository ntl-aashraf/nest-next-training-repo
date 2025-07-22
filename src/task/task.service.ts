import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createTask(createTaskDto) {
    const { userId, ...taskData } = createTaskDto;
    // Find the user by ID
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const task = this.taskRepository.create({
      ...taskData,
      user: user,
    });
    const taskSaved = await this.taskRepository.save(task);
    return taskSaved;
  }

  async fetchAllTasksWithUserId(userId: string | number) {
    // find all tasks of a specific user
    const numericUserId =
      typeof userId === 'string' ? parseInt(userId, 10) : userId;
    const tasksList = await this.taskRepository.find({
      where: { user: { id: numericUserId } },
      relations: ['user'],
    });
    return tasksList;
  }

  async getTaskById(id: number) {
    // find a task by its ID
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async fetchActiveTasks() {
    // find all tasks of all users
    const tasksList = await this.taskRepository.find({
      where: { is_completed: false },
      relations: ['user'],
    });

    if (!tasksList || tasksList.length === 0) {
      throw new NotFoundException('No tasks found');
    }
    return tasksList;
  }

  async fetchAllTasks() {
    // find all tasks of a specific user
    const tasksList = await this.taskRepository.find({
      relations: ['user'],
    });

    if (!tasksList || tasksList.length === 0) {
      throw new NotFoundException('No tasks found for this user');
    }
    return tasksList;
  }

  async fetchPendingTasksWithUserId(userId: string | number) {
    // find all pending tasks of a specific user
    const numericUserId =
      typeof userId === 'string' ? parseInt(userId, 10) : userId;
    const tasksList = await this.taskRepository.find({
      where: { user: { id: numericUserId }, is_completed: false },
      relations: ['user'],
    });

    if (!tasksList || tasksList.length === 0) {
      throw new NotFoundException('No pending tasks found for this user');
    }
    return tasksList;
  }

  async fetchPendingTasks(id: number) {
    // find all pending tasks of all users
    const tasksList = await this.taskRepository.find({
      where: { is_completed: false, id },
    });

    if (!tasksList || tasksList.length === 0) {
      throw new NotFoundException('This task is not pending or does not exist');
    }
    return tasksList;
  }

  async deleteTask(id: number) {
    // delete a task by its ID
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.taskRepository.remove(task);
    return { message: `Task with ID ${id} deleted successfully` };
  }

  async updateTask(id: number) {
    // update a task by its ID
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    // Here you would typically update the task properties based on the request body
    // For simplicity, let's assume we just toggle the completion status
    task.is_completed = !task.is_completed;
    const updatedTask = await this.taskRepository.save(task);
    return updatedTask;
  }
}
