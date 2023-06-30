export class UpdateTrashDto {
    id?: string;
    reference: string;
    description: string;
    address: string;
    posterId: string;
    burners?: string[];
}