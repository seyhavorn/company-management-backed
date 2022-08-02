import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  zoomUrl: string;

  @ManyToMany(() => Employee, employee => employee.meetings)
  attendees: Employee[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
