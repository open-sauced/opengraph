import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUserCard(username: string): string {
    return `Hello ${username}!`;
  }
}
