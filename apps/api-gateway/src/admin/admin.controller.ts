import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../user/role/decorators/role.decorator';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { TrashDto } from './dto/trash.dto';
import { UpdateTrashDto } from './dto/updateTrashDto.dto';
import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Get('trashs')
    @Roles(Role.Admin)
    findAllTrash() {
        return this.adminService.findAllTrash();
    }

    @Put('trashs/:id')
    @Roles(Role.Admin)
    updateTrash(@Param('id') id: string, @Body() updateTrashDto: UpdateTrashDto) {
        console.log('gate controller', updateTrashDto);
        return this.adminService.updateTrash(id, updateTrashDto);
    }
    
    @Get('users')
    @Roles(Role.Admin)
    findAllUser() {
        return this.adminService.findAllUser();
    }
    
    @Get('manifestations')
    @Roles(Role.Admin)
    findAllManifestation() {
        return this.adminService.findAllManifestation();
    }

    @Get('messages')
    @Roles(Role.Admin)
    findAllMessage() {
        return this.adminService.findAllMessage();
    }

    @Put('messages/:id')
    @Roles(Role.Admin)
    updateMessage(@Param('id') id: string, @Body() messageDto: MessageDto) {
        return this.adminService.updateMessage(id, messageDto);
    }

    @Delete('messages/:id')
    @Roles(Role.Admin)
    removeMessage(@Param('id') id: string) {
        return this.adminService.removeMessage(id);
    }
}