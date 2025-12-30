import { Request, Response } from 'express';
import TraktService from '@services/trakt';

export default class TraktController {
    static async handler(req: Request, res: Response): Promise<void> {
        const trakt: TraktService = new TraktService(req.params.type!);
        res.ok(await trakt.handle(req.params.method, req.query) as object);
    };
};