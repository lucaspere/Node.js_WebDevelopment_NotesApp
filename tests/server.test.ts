import { assert } from 'chai';
import Fastify from 'fastify';
import { Server } from '../src/server';
import sinon from 'sinon';

describe('Server test', function () {
    this.beforeEach(() => {
        sinon.restore();
    });

    const serverMock = new Server(Fastify({ logger: false }));

    context('Test run Server', function () {
        it('Should Load Plugins', async function () {
            const server = await serverMock.run();

            assert.isTrue(server instanceof Server);
        });

        it('Should handle server loading plugins', async () => {
            sinon
                .stub(serverMock._app, 'ready')
                .throws({ name: 'Error Test', message: 'Mock error' });

            try {
                await serverMock.run();
            } catch (err) {
                assert.isTrue(err instanceof Error);
                assert.equal(
                    err.message,
                    "Failed to load plugins: { name: 'Error Test', msg: 'Mock error' }",
                );
            }
        });

        it('Should handle server startup failures', async () => {
            sinon
                .stub(serverMock._app, 'listen')
                .throws({ name: 'Error Test', message: 'Mock error' });

            try {
                await serverMock.run();
            } catch (err) {
                assert.isTrue(err instanceof Error);
                assert.equal(
                    err.message,
                    "Failed to start the server: { name: 'Error Test', msg: 'Mock error' }",
                );
            }
        });
    });

    it('Should handle server closed failures', async () => {
        sinon
            .stub(serverMock._app, 'close')
            .throws({ name: 'Error Test', message: 'Mock error' });

        try {
            await serverMock.close();
        } catch (err) {
            assert.isTrue(err instanceof Error);
            assert.equal(
                err.message,
                "Failed to close the server: { name: 'Error Test', msg: 'Mock error' }",
            );
        }
    });
});
