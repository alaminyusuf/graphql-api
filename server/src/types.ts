import { Request, Response } from 'express';
import { Session } from 'express-session';
import { ObjectID } from 'typeorm';

export type MyContext = {
	res: Response;
	req: Request & { session?: Session & { userId?: string | ObjectID } };
};
