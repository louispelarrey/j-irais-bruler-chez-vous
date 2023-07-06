import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../user/role/decorators/role.decorator';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { UpdateTrashDto } from './dto/updateTrashDto.dto';
import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    /**
   * Retrieves all the trashes.
   * @returns The trashes.
   */
    @Get('trashs')
    @Roles(Role.Admin)
    findAllTrash() {
        return this.adminService.findAllTrash();
    }

    /**
   * Updates a trash.
   * @param id - The ID of the trash.
   * @param updateTrashDto - The update data for the trash.
   * @returns The updated trash.
   */
    @Put('trashs/:id')
    @Roles(Role.Admin)
    updateTrash(@Param('id') id: string, @Body() updateTrashDto: UpdateTrashDto) {
        return this.adminService.updateTrash(id, updateTrashDto);
    }

    /**
   * Retrieves all the users.
   * @returns The users.
   */
    @Get('users')
    @Roles(Role.Admin)
    findAllUser() {
        return this.adminService.findAllUser();
    }

    /**
   * Retrieves all the manifestations.
   * @returns The manifestations.
   */
    @Get('manifestations')
    @Roles(Role.Admin)
    findAllManifestation() {
        return this.adminService.findAllManifestation();
    }

    /**
   * Retrieves all the messages.
   * @returns The messages.
   */
    @Get('messages')
    @Roles(Role.Admin)
    findAllMessage() {
        return this.adminService.findAllMessage();
    }

    /**
   * Updates a message.
   * @param id - The ID of the message.
   * @param messageDto - The update data for the message.
   * @returns The updated message.
   */
    @Put('messages/:id')
    @Roles(Role.Admin)
    updateMessage(@Param('id') id: string, @Body() messageDto: MessageDto) {
        return this.adminService.updateMessage(id, messageDto);
    }

    /**
   * Removes a message.
   * @param id - The ID of the message to remove.
   * @returns The deleted message.
   */
    @Delete('messages/:id')
    @Roles(Role.Admin)
    removeMessage(@Param('id') id: string) {
        return this.adminService.removeMessage(id);
    }
}
