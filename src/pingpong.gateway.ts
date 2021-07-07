import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

interface Move {
  upDownValue: number;
  leftRightValue: number;
}

@WebSocketGateway()
export class PingpongGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('move')
  handleMessage(@MessageBody() move: Move, @ConnectedSocket() client: Socket) {
    this.server.emit('move', move);
  }

  afterInit() {
    console.log('Gateway init!');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`client connected ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`client disconnected ${client.id}`);
  }
}
