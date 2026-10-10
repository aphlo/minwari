import { createServer } from "node:http";
import { createReadOnlyHandler } from "./handler";

const server = createServer(createReadOnlyHandler());
server.listen(Number(process.env.PORT ?? 8081), "0.0.0.0");
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
