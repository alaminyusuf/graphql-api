import { Field, Int } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class User extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'number' })
	@Field(() => Int)
	id: number;

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
	password: string;
}
