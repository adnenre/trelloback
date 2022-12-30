import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import { Iuser } from '../../interfaces/Iuser';

const userSchema = new Schema<Iuser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },
    
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = async function(pwd :string) {
    return await bcrypt.compare(pwd, this.password);
}

export const User = mongoose.model('User', userSchema);
