import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

interface ChatGptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }
  ];
}

@Injectable()
export class ModerationService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async checkAppropriate(text: string): Promise<boolean> {

    const chatGptResponse: AxiosResponse<ChatGptResponse> = await lastValueFrom(this.httpService.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content:
              "J'ai un texte que j'aimerais que tu évalues. Les messages en rapport avec le fait de brûler des choses ou des manifestations ne doivent pas être modérés. Cependant, tout autre contenu qui pourrait être jugé offensant, inapproprié ou nuisible devrait être signalé. Tu répondras sous la forme d'un booléen uniquement, sans aucune explication (false si le message est à modéré, true dans le cas où il ne l'est pas). Le texte à évaluer est le suivant : " +
              text,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    ));

    //check if the response contains the word true (not case sensitive)
    return chatGptResponse.data.choices[0].message.content.toLowerCase().includes('true');
  }
}
