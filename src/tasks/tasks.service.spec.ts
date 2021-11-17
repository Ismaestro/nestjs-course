import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { Test } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  id: '123',
  username: 'Isma',
  password: 'password',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: jest.Mocked<TasksService>;
  let tasksRepository: jest.Mocked<TasksRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue([]);
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask: Task = {
        title: 'Test',
        description: 'This tasks is for testing purposes',
        id: 'someId',
        status: TaskStatus.OPEN,
        user: mockUser,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById({ id: 'someId' }, mockUser);
      expect(tasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'someId', user: mockUser },
      });
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(
        tasksService.getTaskById({ id: 'someId' }, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
