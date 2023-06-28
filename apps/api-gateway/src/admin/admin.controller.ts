import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Get('trashs')
    findAllTrash() {
        return this.adminService.findAllTrash();
    }
    
    @Get('users')
    findAllUser() {
        return this.adminService.findAllUser();
    }

    @Get('manifestations')
    findAllManifestation() {
        return this.adminService.findAllManifestation();
    }
}