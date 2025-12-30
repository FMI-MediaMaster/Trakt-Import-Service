import runImportTests, { Fields } from '@media-master/import-service-tests';
import { Express } from 'express';
import { describe } from 'vitest';
import app from '../src/app';

const server = app as Express;

describe('Controller', () => {
    describe('Endpoint /movies', () => {
        const endpoint: string = '/movies';
        const validIds: string[] = [
            'blackspell',
            'Duckyz95',
            'Karmalakas',
        ];
        const invalidIds: string[] = [
            '-1',
            'Not an id',
            'nonExistentId',
        ];
        const fields: Fields = {
            name: { type: 'string' },
        };
        runImportTests(
            server,
            endpoint,
            { validIds, invalidIds, fields }
        );
    });
    describe('Endpoint /series', () => {
        const endpoint: string = '/series';
        const validIds: string[] = [
            'blackspell',
            'Duckyz95',
            'Karmalakas',
        ];
        const invalidIds: string[] = [
            '-1',
            'Not an id',
            'nonExistentId',
        ];
        const fields: Fields = {
            name: { type: 'string' },
        };
        runImportTests(
            server,
            endpoint,
            { validIds, invalidIds, fields }
        );
    });
});
