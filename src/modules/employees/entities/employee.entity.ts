import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ContactInfo } from '../../contact-infos/entities/contact-info.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.directReports, { onDelete: 'SET NULL' })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @OneToMany(() => Meeting, (meetings) => meetings.attendees)
  @JoinTable()
  meetings: Meeting[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
