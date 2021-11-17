import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: `Status must be a TaskStatus value` })
  status?: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;
}
