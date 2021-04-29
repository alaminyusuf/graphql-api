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
	async currentUser(@Ctx() { req }: MyContext) {
		if (!req.session.userId) return undefined;

		const refId = req.session.userId;

		const user = await User.findOne(refId);

		return user;
	}
}
