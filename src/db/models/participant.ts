import { model, Schema } from 'mongoose';
import { IParticipant } from '../../types/participants';

const participantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    heardFrom: {
      type: String,
      required: true,
    },
    events: [
      {
        eventName: {
          type: String,
          required: true,
        },
        eventDate: {
          type: Date,
          required: true,
        },
        eventCity: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const participantsCollection = model<IParticipant>(
  'participants',
  participantSchema,
);
