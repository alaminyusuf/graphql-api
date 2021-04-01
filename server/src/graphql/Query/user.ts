import { Resolver, Query } from 'type-graphql';
import { User } from '../../models/User';

@Resolver()
export class UserQuery {
	@Query(() => [User])
	async users(): Promise<User[] | undefined> {
		return await User.find();
	}
}
