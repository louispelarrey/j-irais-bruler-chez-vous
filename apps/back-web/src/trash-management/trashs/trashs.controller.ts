import { Controller } from '@nestjs/common';

@Controller('trashs')
export class TrashsController {
    listTrashs() {
        return 'List of trashs';
    }

    getTrash() {
        return 'Get trash';
    }
}
