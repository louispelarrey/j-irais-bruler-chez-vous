import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  UsersService,
} from '@j-irais-bruler-chez-vous/user/feature';
import { Users } from '@j-irais-bruler-chez-vous/user/feature';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

    /**
   * Find a user by identifier.
   * @param {string} identifier - The user's identifier.
   * @returns {Promise<Users>} A promise that resolves to the found user.
   */
  @MessagePattern('findUserByIdentifier')
  async findUserByIdentifier(@Payload() identifier: string): Promise<Users> {
    return this.userService.findByIdentifier(identifier);
  }

    /**
   * Find a user by ID.
   * @param {string} id - The user's ID.
   * @returns {Promise<Users>} A promise that resolves to the found user.
   */
  @MessagePattern('findUserById')
  async findUserById(@Payload() id: string): Promise<Users> {
    return this.userService.findOne(id);
  }

    /**
   * Create a new user.
   * @param {CreateUserDto} createUserDto - The DTO containing user data.
   * @returns {Promise<Users>} A promise that resolves to the created user.
   */
  @MessagePattern('createUser')
  handleCreateUser(@Payload() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }

    /**
   * Update a user by ID.
   * @param {string} id - The ID of the user to update.
   * @param {CreateUserDto} updateUserDto - The DTO containing updated user data.
   * @returns {Promise<Users>} A promise that resolves to the updated user.
   */
  @MessagePattern('updateUser')
  async handleUpdateUser(@Payload(){ id, updateUserDto }: { id: string; updateUserDto: CreateUserDto }): Promise<Users> {
    return this.userService.updateUser(id, updateUserDto);
  }

    /**
   * Delete a user by ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<Users>} A promise that resolves to the deleted user.
   */
  @MessagePattern('deleteUser')
  handleDeleteUser(@Payload() id: string): Promise<Users> {
    return this.userService.deleteUser(id);
  }

    /**
   * Retrieve all users.
   * @returns {Promise<Users[]>} A promise that resolves to an array of users.
   */
  @MessagePattern('findAllUsers')
  handleFindAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

    /**
   * Handle the forgot password request.
   * @param {string} email - The user's email address.
   * @returns {Promise<boolean>} A promise that resolves to true if the request is successful.
   */
  @MessagePattern('forgotPassword')
  handleForgotPassword(@Payload() email: string): Promise<boolean> {
    return this.userService.forgotPassword(email);
  }

    /**
   * Handle the forgot password token request.
   * @param {string} id - The user's ID.
   * @param {string} password - The new password.
   * @returns {Promise<boolean>} A promise that resolves to true if the request is successful.
   */
  @MessagePattern('forgotPasswordToken')
  handleForgotPasswordToken(@Payload() {id, password}: {id: string, password: string}): Promise<boolean> {
    return this.userService.forgotPasswordToken(id, password);
  }

  @MessagePattern('addTrashToUser')
  handleAddTrashToUser(@Payload() {userId, trashId}: {userId: string, trashId: string}): Promise<Users> {
    return this.userService.addTrashToUser(userId, trashId);
  }

  @MessagePattern('removeTrashToUser')
  handleRemoveTrashToUser(@Payload() {userId, trashId}: {userId: string, trashId: string}): Promise<Users> {
    return this.userService.removeTrashToUser(userId, trashId);
  }

  @MessagePattern('addManifestationToUser')
  handleAddManifestationToUser(@Payload() {userId, manifestationId}: {userId: string, manifestationId: string}): Promise<Users> {
    return this.userService.addManifestationToUser(userId, manifestationId);
  }

  @MessagePattern('removeManifestationToUser')
  handleRemoveManifestationToUser(@Payload() {userId, manifestationId}: {userId: string, manifestationId: string}): Promise<Users> {
    return this.userService.removeManifestationToUser(userId, manifestationId);
  }
}
