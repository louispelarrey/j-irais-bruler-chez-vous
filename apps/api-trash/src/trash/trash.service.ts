import { Injectable } from '@nestjs/common';

@Injectable()
export class TrashService {
    findAll( data : any ) {
        console.log('api-trash', data);
        return { message: 'Welcome to api-trash!' };
    }
}
