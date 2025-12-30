import fetch from 'node-fetch';
import config from '@media-master/load-dotenv';
import errors from '@media-master/http-errors';

import {
    Query,
    TraktWatchlistItem,
    MediaResult,
} from '@types';

export default class TraktService {
    private readonly headers: Record<string, string>;
    private readonly mediaType: 'movies' | 'shows';

    constructor(mediaType: string) {
        if (!['movies', 'series'].includes(mediaType)) {
            throw errors.notFound(
                'Invalid endpoint! Use /[movies|series]/[import]'
            );
        }

        this.mediaType = mediaType === 'movies' ? 'movies' : 'shows';
        this.headers = {
            'Content-Type'     : 'application/json',
            'trakt-api-key'    : config.TRAKT_ID,
            'trakt-api-version': '2',
        };
    };

    private request = async <T>(username: string): Promise<T | undefined> => {
        const url = new URL(`https://api.trakt.tv/users/${username}/watchlist/${this.mediaType}`)

        const response = await fetch(url, { headers: this.headers });
        if (!response.ok) return undefined;

        return (await response.json()) as T;
    };

    private getImport = async (username: string): Promise<MediaResult[]> => {
        const data = await this.request<TraktWatchlistItem[]>(username);

        if (!Array.isArray(data)) return [];

        return data.map((media) => ({
            name:
                media.type === 'movie'
                    ? media.movie?.title ?? ''
                    : media.show?.title ?? '',
        }));
    };

    public handle = async (method: string, query: Query): Promise<unknown> => {
        const methodMap: Record<string, (param: string) => Promise<unknown>> = {
            import: this.getImport,
        };

        if (!(method in methodMap)) {
            throw errors.notFound(
                'Invalid endpoint! Use /[movies|series]/[import]'
            );
        }

        const param = query['id'];
        if (param === undefined) throw errors.badRequest(`Missing parameter for the ${method} endpoint`);

        return await methodMap[method](param);
    };
};