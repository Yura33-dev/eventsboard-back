import { model, Schema, Types } from 'mongoose';
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    humanDate: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    promoter: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    venue: {
        type: String,
        required: false,
    },
    participants: [
        {
            type: Types.ObjectId,
            ref: 'participants',
            default: [],
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
export const eventsCollection = model('events', eventSchema);
