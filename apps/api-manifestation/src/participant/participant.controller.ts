import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller()
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @MessagePattern('createParticipant')
  create(@Payload() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @MessagePattern('findAllParticipant')
  findAll() {
    return this.participantService.findAll();
  }

  @MessagePattern('findOneParticipant')
  findOne(@Payload() id: number) {
    return this.participantService.findOne(id);
  }

  @MessagePattern('removeParticipant')
  remove(@Payload() id: number) {
    return this.participantService.remove(id);
  }
}
