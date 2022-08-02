import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { name, imageUrl, description } = createEmployeeDto;
    const employee = new Employee();
    employee.name = name;
    employee.imageUrl = imageUrl;
    employee.description = description;
    await this.employeeRepository.save(employee);
    return this.employeeRepository.create(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const found = await this.employeeRepository.findOneBy({ id });
    if (found === null) {
      throw new NotFoundException(`Id ${ id } is not found`);
    }
    return found;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id);
    await this.employeeRepository.update(id, updateEmployeeDto);
    const updated = await this.findOne(id);
    return {
      data: updated,
      message: `Id ${ id } has been update.`,
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.employeeRepository.delete(id);
    return {
      message: `Id ${ id } has been deleted.`,
    }
  }
}
