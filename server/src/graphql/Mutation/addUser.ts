import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../db/models/User';
import { InputOptions } from './inputOptions';
import { getMongoManager } from 'typeorm';

@Resolver()
export class UserResolver {
	@Mutation(() => User)
	async addUser(@Arg('options', () => InputOptions) options: InputOptions) {
		try {
			const user = new User();
			user.first_name = options.first_name;
			user.last_name = options.last_name;
			user.email = options.email;
			user.password = options.password;
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
