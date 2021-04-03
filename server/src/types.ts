import { Request, Response } from 'express';
import { SessionData } from 'express-session';

export type MyContext = {
	res: Response;
	req: Request & { session: SessionData };
};
