import { Controller } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @MessagePattern('check-moderation')
  checkModeration(text: string): Promise<boolean> {
    return this.moderationService.checkAppropriate(text);
  }
}
