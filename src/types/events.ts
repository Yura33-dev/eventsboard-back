import { Types } from 'mongoose';

export interface IEvent {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  imageUrl: string;
  type: string;
  description: string;
  humanDate: string;
  date: Date;
  promoter: string;
  city: string;
  venue: string;
  participants: Types.ObjectId[];
}
