import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Creates an instance of JwtAuthGuard.
   * @param reflector - The reflector instance.
   */
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Determines if the request is authorized.
   * @param context - The execution context.
   * @returns A boolean indicating whether the request is authorized.
   */
  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
