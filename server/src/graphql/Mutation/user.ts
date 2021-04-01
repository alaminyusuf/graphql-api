import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../models/User';
import { InputOptions } from '../utils/inputOptions';
import argon from 'argon2';
import { UserResponse } from '../utils/fieldsUtil';
import { validationUtil } from '../utils/validationUtil';

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponse)
	async addUser(
		@Arg('options', () => InputOptions) options: InputOptions
	): Promise<UserResponse> {
		let user;
		const errors = validationUtil(options);
		if (errors) return { errors };
		try {
			const hashedPassword = await argon.hash(options.password);
			const result = await User.create({
				first_name: options.first_name,
				last_name: options.last_name,
				email: options.email,
				password: hashedPassword,
			}).save();
			user = result;
		} catch (e) {
			if (e.code == '23505') {
				return {
					errors: {
						field: 'email',
						message: 'email already taken',
					},
				};
			}
		}
		return { user };
	}

	@Mutation(() => String)
	hey(@Arg('name', () => String) name: string) {
		return `Hello ${name}`;
	}
}
