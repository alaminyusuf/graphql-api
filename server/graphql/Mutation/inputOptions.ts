import { InputType, Field } from 'type-graphql';

@InputType()
export class InputOptions {
    @Field(() => String)
    password: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    username: string;
}

