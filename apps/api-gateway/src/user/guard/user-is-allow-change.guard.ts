import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users.service';
import { lastValueFrom } from 'rxjs';
import { Role } from '@j-irais-bruler-chez-vous/shared';

/**
 * Guard to check if the user is allowed to change the user - it checks if the user is an admin or the owner of the user
 */
@Injectable()
export class UserIsAllowedChange implements CanActivate {

  /**
   * Creates an instance of UserIsAllowedChange.
   * @param {UsersService} usersService - The UsersService instance.
   */
  constructor(
    private readonly usersService: UsersService,
  ) {}

  /**
   * Determines whether the user is allowed to change the user.
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} A boolean indicating whether the user is allowed to change the user.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const currentUser = await lastValueFrom(this.usersService.findOne(user.sub));

    const isAdmin = currentUser.roles.includes(Role.Admin);
    const isOwner = currentUser.id == params.id;

    return isAdmin || isOwner;
  }
}
