import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	createdAt?: string;
}

const userSchema: Schema = new Schema({
	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model<IUser>('User', userSchema);
