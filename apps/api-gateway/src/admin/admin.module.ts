import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TRASH',
                transport: Transport.TCP,
                options: {
                    host: process.env.TCP_TRASH_HOST,
                    port: 3003,
                },
            },
            {
                name: 'USER',
                transport: Transport.TCP,
                options: {
                    host: process.env.TCP_USER_HOST,
                    port: 3001,
                },
            },
            {
                name: 'MANIFESTATION',
                transport: Transport.TCP,
                options: {
                    host: process.env.TCP_MANIFESTATION_HOST,
                    port: 3004,
                },
            },
            {
                name: 'MESSAGE',
                transport: Transport.TCP,
                options: {
                    host: process.env.TCP_MESSAGE_HOST,
                    port: 3002,
                },
            },
            {
                name: 'ADMIN',
                transport: Transport.TCP,
                options: {
                    host: process.env.TCP_ADMIN_HOST,
                    port: 3005,
                },
            }
        ])
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {}