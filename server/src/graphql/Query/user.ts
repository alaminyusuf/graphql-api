import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../models/User';

@Resolver()
export class UserQuery {
	@Query(() => [User])
	async users(): Promise<User[] | undefined> {
		return await User.find();
	}

	@Query(() => User)
	async user(@Arg('id', () => String) id: string): Promise<User | undefined> {
		return await User.findOne(id);
	}
}
