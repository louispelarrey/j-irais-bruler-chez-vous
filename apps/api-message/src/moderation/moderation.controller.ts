import { Controller } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  /**
   * Checks if the text is appropriate.
   * @param {string} text - The text to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the text is appropriate.
   */
  @MessagePattern('check-moderation')
  checkModeration(text: string): Promise<boolean> {
    return this.moderationService.checkAppropriate(text);
  }
}
