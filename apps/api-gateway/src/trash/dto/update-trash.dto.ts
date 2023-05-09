import { IsString } from 'class-validator';

export class UpdateTrashDto {

    @IsString()
    description: string;

    isBurned: boolean;

    isActive: boolean;
}