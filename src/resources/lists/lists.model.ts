import mongoose,{Schema} from 'mongoose';
import { Ilists } from '../../interfaces/Ilist';

const listsSchema = new Schema<Ilists>(
    {
        id: {
            type: String,
            unique: true,
        },
        title: String,
        tasks: [
            {
                id: String,
                title: String,
            },
        ],
    },
    { timestamps: true }
);

export const Lists = mongoose.model('Lists', listsSchema);
