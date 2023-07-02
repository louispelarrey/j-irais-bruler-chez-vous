import { Role } from '@j-irais-bruler-chez-vous/shared';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator to associate roles with a handler or controller.
 * @param {...Role[]} roles - The roles to associate.
 * @returns {(...args: any[]) => void} The decorator function.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
