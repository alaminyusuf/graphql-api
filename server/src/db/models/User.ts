import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
	@ObjectIdColumn()
	@Field(() => Int)
	id: ObjectID;

	@Column({ type: 'varchar', nullable: false })
	@Field(() => String)
	first_name: string;

	@Column({ type: 'varchar', nullable: false })
	@Field(() => String)
	last_name: string;

	@Column({ type: 'varchar', nullable: false, unique: true })
	@Field(() => String)
	email: string;

	@Column({ type: 'varchar', nullable: false })
	@Field(() => String)
	password: string;
}
