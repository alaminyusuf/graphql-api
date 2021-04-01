import { InputOptions } from './inputOptions';

export const validationUtil = (options: InputOptions) => {
	if (options.first_name.length <= 2) {
		return {
			field: 'first name',
			message: 'first name must be greater than 2',
		};
	}

	if (options.last_name.length <= 2) {
		return {
			field: 'last name',
			message: 'last name must be greater than 2',
		};
	}

	if (options.email.length <= 5 || !options.email.includes('@')) {
		return {
			field: 'email',
			message: 'invalid email',
		};
	}

	if (options.password.length <= 5) {
		return {
			field: 'password',
			message: 'password must at least be 6',
		};
	}

	return null;
};
