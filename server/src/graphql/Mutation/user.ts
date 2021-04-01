import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../../models/User';
import { InputOptions } from './inputOptions';
// import { getMongoManager } from 'typeorm';
import argon from 'argon2';

@ObjectType()
class ResponseError {
	@Field(() => String)
	field: string;

	@Field(() => String)
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User;

	@Field(() => ResponseError, { nullable: true })
	error?: ResponseError;
}

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponse)
	async addUser(
		@Arg('options', () => InputOptions) options: InputOptions
	): Promise<UserResponse> {
		try {
			const hashedPassword = await argon.hash(options.password);
			const user = await User.create({
				first_name: options.first_name,
				last_name: options.last_name,
				email: options.email,
				password: hashedPassword,
			});
			return { user };
		} catch (e) {
			return {
				error: {
					field: 'username',
					message: 'username or email already taken',
				},
			};
		}
	}

	@Mutation(() => String)
	hey(@Arg('name', () => String) name: string) {
		return `Hello ${name}`;
	}
}
