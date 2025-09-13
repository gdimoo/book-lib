import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;
    const token = (auth || '').replace(/^Bearer\s+/i, '');
    const expected = process.env.AUTH_TOKEN || 'sk_demo_token_123';
    if (!token || token !== expected) throw new UnauthorizedException('Invalid token');
    return true;
  }
}
