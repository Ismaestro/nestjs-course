import { IsUuidString } from '../../common/validations/is-uuid-string';

export class GetTaskByIdDto {
  @IsUuidString()
  id: string;
}
