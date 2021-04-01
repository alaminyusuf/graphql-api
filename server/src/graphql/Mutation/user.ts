import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../models/User';
import { InputOptions } from './inputOptions';
import argon from 'argon2';
import { UserResponse } from '../utils/fieldsUtil';

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
