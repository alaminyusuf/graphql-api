import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../models/User';
import { InputOptions } from './inputOptions';
import { getMongoManager } from 'typeorm';
import argon from 'argon2';

@Resolver()
export class UserResolver {
	@Mutation(() => User)
	async addUser(@Arg('options', () => InputOptions) options: InputOptions) {
		try {
			const hashedPassword = (await argon.hash(options.password)) as any;
			const user = new User();
			user.first_name = options.first_name;
			user.last_name = options.last_name;
			user.email = options.email;
			user.password = hashedPassword;
			const manager = getMongoManager();
			await manager.save(user);
			return user;
		} catch (e) {
			console.log(e);
		}
	}

	@Mutation(() => String)
	hey(@Arg('name', () => String) name: string) {
		return `Hello ${name}`;
	}
}
