import { Module } from '@nestjs/common';
import { EventGateway } from '../socket/event.gateway';

@Module({
    providers: [EventGateway]
})
export class EventModule {
}
