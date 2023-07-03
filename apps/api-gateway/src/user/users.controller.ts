import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from './role/decorators/role.decorator';
import { Public } from '../authentication/decorators/public.decorator';
import { UserIsAllowedChange } from './guard/user-is-allow-change.guard';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Retrieves a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the retrieved user.
   */
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto - The data for creating the user.
   * @returns {Promise<User>} A promise that resolves to the created user.
   */
  @Post()
  @Public()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Updates a user.
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data for updating the user.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   */
  @Put(':id')
  @UseGuards(UserIsAllowedChange)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Deletes a user.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<User>} A promise that resolves to the deleted user.
   */
  @Delete(':id')
  @UseGuards(UserIsAllowedChange)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  /**
   * Generates a forgot password token for a user.
   * @param {string} id - The ID of the user.
   * @param {Object} body - The request body containing the new password.
   * @param {string} body.password - The new password.
   * @returns {Promise<User>} A promise that resolves to the updated user with the new password token.
   */
  @Post('forgot-password/:id')
  @Public()
  forgotPasswordToken(@Param('id') id: string, @Body() { password }: { password: string }){
    return this.userService.forgotPasswordToken(id, password);
  }

  /**
   * Sends a forgot password email to a user.
   * @param {Object} body - The request body containing the user's email.
   * @param {string} body.email - The user's email.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   */
  @Post('forgot-password')
  @Public()
  forgotPassword(@Body() { email }: { email: string }) {
    return this.userService.forgotPassword(email);
  }
}
