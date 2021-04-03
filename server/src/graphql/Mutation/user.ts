import { MyContext } from './../../types';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../models/User';
import { InputOptions } from '../utils/inputOptions';
import argon from 'argon2';
import { UserResponse } from '../utils/fieldsUtil';
import { validationUtil } from '../utils/validationUtil';

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponse)
	async addUser(
		@Arg('options', () => InputOptions) options: InputOptions,
		@Ctx() { req }: MyContext
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
		if (typeof user !== 'undefined') {
			req.session.userId = user.id;
		}
		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('email', () => String) email: string,
		@Arg('password', () => String) password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return {
				errors: {
					field: 'user',
					message: 'user does not exits',
				},
			};
		}

		const valid = await argon.verify(user.password, password);

		if (!valid) {
			return {
				errors: {
					field: 'password',
					message: 'password mismatch',
				},
			};
		}
		console.log(req);
		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => String)
	hey(@Arg('name', () => String) name: string) {
		return `Hello ${name}`;
	}
}
