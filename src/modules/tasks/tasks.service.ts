import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, employeeId } = createTaskDto;
    const task = new Task();
    task.name = name;
    task.employeeId = employeeId;
    await this.taskRepository.save(task);
    return this.taskRepository.create(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (found === null) {
      throw new NotFoundException(`Id ${ id } is not found.`);
    }
    return found;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    await this.taskRepository.update(id, updateTaskDto);
    const updated = await this.findOne(id);
    return {
      data: updated,
      message: `Id ${ id } has been update.`,
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.taskRepository.delete(id);
    return {
      message: `Id ${ id } has been deleted.`,
    }
  }
}
