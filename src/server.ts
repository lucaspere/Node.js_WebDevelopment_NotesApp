import { FastifyInstance } from 'fastify';
import { inspect } from 'util';
const PORT = process.env.PORT || '3000';

export class AppExecutor {
    constructor(private app: FastifyInstance) {}

    async run(): Promise<FastifyInstance> {
        await this.prepare();
        await this.start();

        return this.app;
    }

    private async prepare() {
        try {
            this.app.log.info('Loading the plugin...');
            await this.app.ready();
            this.app.log.info('Plugins loaded successfully.');
        } catch (err) {
            throw Error(`Failed to load plugins: ${inspect(err)}`);
        }
    }

    public async start(): Promise<string> {
        try {
            this.app.log.info('Starting the server...');
            const address = await this.app.listen(PORT);

            return address;
        } catch (err) {
            throw Error(`Failed to start the server: ${inspect(err)}`);
        }
    }

    async close(): Promise<void> {
        try {
            this.app.log.info('Closing the server...');
            await this.app.close();
        } catch (err) {
            throw Error(`Failed to close the server: ${inspect(err)}`);
        }
    }
}
