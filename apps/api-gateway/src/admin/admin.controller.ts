import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../user/role/decorators/role.decorator';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Get('trashs')
    @Roles(Role.Admin)
    findAllTrash() {
        return this.adminService.findAllTrash();
    }
    
    @Get('users')
    @Roles(Role.Admin)
    findAllUser() {
        return this.adminService.findAllUser();
    }

    @Put('users/:id')
    @Roles(Role.Admin)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        console.log('updateUserDtoControlleeeeer', updateUserDto);
        return this.adminService.updateUser(id, updateUserDto);
    }

    @Get('manifestations')
    @Roles(Role.Admin)
    findAllManifestation() {
        return this.adminService.findAllManifestation();
    }
}