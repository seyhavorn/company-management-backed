import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Seyha Dev', text: 'Hello' }];
  ClientToUser = {};

  identify(name: string, clientId: string) {
    this.ClientToUser[clientId] = name;

    return Object.values(this.ClientToUser);
  }

  getClientName(clientId: string) {
    return this.ClientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.ClientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
