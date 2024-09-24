import { Types } from 'mongoose';

interface IParticipantEvents {
  eventName: string;
  eventDate: Date;
  eventCity: string;
}

export interface IParticipant {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  email: string;
  birthDate: Date;
  heardFrom: string;
  events: IParticipantEvents[];
}
