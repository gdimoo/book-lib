import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    if (body?.username === 'admin' && body?.password === 'admin') {
      return { token: process.env.AUTH_TOKEN || 'sk_demo_token_123' };
    }
    return { error: 'Invalid credentials' };
  }
}
