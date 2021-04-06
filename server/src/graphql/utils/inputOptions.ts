import { InputType, Field } from 'type-graphql';

@InputType()
export class InputOptions {
	@Field(() => String)
	password: string;

	@Field(() => String)
	email: string;

	@Field(() => String)
	first_name: string;

	@Field(() => String)
	last_name: string;
}

@InputType()
export class LoginOptions {
	@Field(() => String)
	email: string;

	@Field(() => String)
	password: string;
}
