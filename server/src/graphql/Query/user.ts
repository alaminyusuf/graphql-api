import { UserResponse } from './../utils/fieldsUtil';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { User } from '../../models/User';
import { MyContext } from '../../types';

@Resolver()
export class UserQuery {
	@Query(() => [User])
	async users(): Promise<User[] | undefined> {
		return await User.find();
	}

	@Query(() => UserResponse)
	async user(@Arg('id', () => String) id: string): Promise<UserResponse> {
		const user = await User.findOne(id);
		return { user };
	}

	@Query(() => User, { nullable: true })
	async currentUser(@Ctx() { req }: MyContext): Promise<User | undefined> {
		// if (!req.session.userId) return null;
		const user = await User.findOne({ where: { id: req.session.userId } });
		return user;
	}
}
