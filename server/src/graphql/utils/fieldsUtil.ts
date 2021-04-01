import { ObjectType, Field } from 'type-graphql';
import { User } from '../../models/User';
@ObjectType()
class ResponseError {
	@Field(() => String)
	field: string;

	@Field(() => String)
	message: string;
}

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User;

	@Field(() => ResponseError, { nullable: true })
	errors?: ResponseError;
}
