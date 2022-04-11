import { FastifyInstance } from "fastify";
const PORT = process.env.PORT || "3000";

export const server = async (server: FastifyInstance) => {
    try {
        await server.listen(PORT, '::');

        const address = server.server.address();
        const port = typeof address === 'string' ? address : address?.port;

        console.log(`Server is running at port ${port}`);
    } catch(err) {
        server.log.error(err);
        process.exit(1);
    }
}