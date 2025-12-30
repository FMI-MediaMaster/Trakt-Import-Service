export interface Query {
    id?: string;
};

type TraktMediaType = 'movie' | 'show';

interface TraktMovie {
    title: string;
}

interface TraktShow {
    title: string;
}

export interface TraktWatchlistItem {
    type: TraktMediaType;
    movie?: TraktMovie;
    show?: TraktShow;
}

export interface MediaResult {
    name: string;
}