import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@j-irais-bruler-chez-vous/user/feature';
import { UsersService } from '../users.service';

/**
 * Guard to check if the user is allowed to change the user - it checks if the user is an admin or the owner of the user
 */
@Injectable()
export class UserIsAllowedChange implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const currentUser = await this.usersService.findOne(user.sub);

    const isAdmin = currentUser.roles.includes(Role.Admin);
    const isOwner = currentUser.id == params.id;

    return isAdmin || isOwner;
  }
}
