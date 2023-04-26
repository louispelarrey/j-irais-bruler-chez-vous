import { Users } from "apps/back-web/src/user-management/user/users.entity";
import { IsString } from "class-validator";

export class CreateManifestationDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    user: Users;
}
