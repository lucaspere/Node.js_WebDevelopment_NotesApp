import { expect } from 'chai';
import { app as server } from '../src/app';
import { v4 as uuid } from 'uuid';
import { AddressInfo } from 'net';

describe('Note API tests', function () {
    const app = server({
        logger: false,
        ajv: {
            customOptions: {
                allErrors: true,
            },
        },
    });
    const ctx = [
        {
            id: uuid(),
            title: 'general test',
            description: 'testing the note api',
        },
    ];

    this.beforeAll(async () => {
        await app.listen(process.env.TEST_PORT);
    });

    this.afterAll(async () => {
        await app.close();
    });

    context('Create Note', function () {
        it('Should create a note with valid payload', async () => {
            const { address, port } = app.server.address() as AddressInfo;

            const res = await app.inject({
                method: 'POST',
                url: '/api/notes/',
                payload: ctx[0],
            });

            expect(res.statusCode).to.be.equal(201);
            expect(res.body).to.be.empty;
            expect(res.headers['location']).to.be.equal(
                `${address}:${port}/api/notes/${ctx[0].id}`,
            );
        });

        it('Should response with bad request with invalid payload', async () => {
            const payload = {};

            const res = await app.inject({
                method: 'POST',
                url: '/api/notes/',
                payload,
            });

            const body = JSON.stringify({
                statusCode: 400,
                error: 'Bad Request',
                message:
                    "body should have required property 'title', body should have required property 'description'",
            });

            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.be.equal(body);
            expect(res.headers['location']).to.be.equal(undefined);
        });
    });

    context('Get Note', function () {
        it('Should retrieve a valid note by id', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/api/notes/' + ctx[0].id,
            });
            const body = JSON.stringify(ctx[0]);

            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(body);
        });

        it('Should response with not found with id of non-existent note', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/api/notes/' + uuid(),
            });

            expect(res.statusCode).to.be.equal(404);
            expect(res.body).to.be.empty;
        });
    });

    context('List Notes', function () {
        it('Should list notes', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/api/notes/',
            });
            const expectedRes = JSON.stringify({
                notes: [ctx[0]],
            });

            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(expectedRes);
        });
    });

    context('Update Note', function () {
        it('Should update a note with valid payload', async () => {
            const payload = {
                title: 'update test 2',
                description: 'testing the update 2 note api',
            };
            const res = await app.inject({
                method: 'PATCH',
                url: '/api/notes/' + ctx[0].id,
                payload,
            });
            const { body } = await app.inject({
                method: 'GET',
                url: '/api/notes/' + ctx[0].id,
            });

            const expectedBody = JSON.stringify({
                ...ctx[0],
                ...payload,
            });

            expect(res.statusCode).to.be.equal(204);
            expect(body).to.be.equal(expectedBody);
        });

        it('Should response with bad request with invalid payload', async () => {
            const payload = {
                title: {},
                description: {},
            };
            const res = await app.inject({
                method: 'PATCH',
                url: '/api/notes/' + ctx[0].id,
                payload,
            });
            const body = JSON.stringify({
                statusCode: 400,
                error: 'Bad Request',
                message:
                    'body.title should be string, body.description should be string',
            });

            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.be.equal(body);
        });

        it('Should response with not found with id of non-existent note', async () => {
            const payload = {
                title: 'update test 2',
                description: 'testing the update 2 note api',
            };
            const res = await app.inject({
                method: 'PATCH',
                url: '/api/notes/' + uuid(),
                payload,
            });

            expect(res.statusCode).to.be.equal(404);
            expect(res.body).to.be.empty;
        });
    });

    context('Delete Note', function () {
        it('Should delete a note', async () => {
            const res = await app.inject({
                method: 'DELETE',
                url: '/api/notes/' + ctx[0].id,
            });

            const { body } = await app.inject({
                method: 'GET',
                url: '/api/notes/' + ctx[0].id,
            });

            expect(res.statusCode).to.be.equal(204);
            expect(body).to.be.empty;
        });

        it('Should response with not found with id of non-existent note', async () => {
            const res = await app.inject({
                method: 'DELETE',
                url: '/api/notes/' + uuid(),
            });

            expect(res.statusCode).to.be.equal(404);
            expect(res.body).to.be.empty;
        });
    });
});
