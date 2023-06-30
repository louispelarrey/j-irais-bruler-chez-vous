export class UpdateTrashDto {
  id?: string;
  data: {
    reference: string;
    description: string;
  };
}
