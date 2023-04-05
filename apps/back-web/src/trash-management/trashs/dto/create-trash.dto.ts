import { Users } from "apps/back-web/src/user-management/user/users.entity";
import { IsString } from "class-validator";

export class CreateTrashDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    user: Users;
}