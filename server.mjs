// @ts-check
import http from "node:http";
import { Transform } from "node:stream";
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "node:stream/web";

/**
 * @type {Array<{ name: string, port: number, handler: http.RequestListener }>}
 */
export const servers = [
  // raw
  {
    name: "raw",
    port: 3003,
    handler: (req, res) => {
      let size = 0;
      req.on("data", (chunk) => {
        size += chunk.length;
      });
      req.on("end", () => {
        res.end();
      });
      req.on("error", (err) => {
        res.end();
      });
    },
  },
  // stream
  {
    name: "stream",
    port: 3004,
    handler: (req, res) => {
      let size = 0;
      const transform = new Transform({
        transform(chunk, encoding, callback) {
          size += Buffer.byteLength(chunk, encoding);
          callback(null, chunk);
        },
      });

      let stream = req.pipe(transform);

      stream.on("data", () => {
        //
      });
      stream.on("end", () => {
        res.end();
      });
      stream.on("error", (err) => {
        res.end();
      });
    },
  },
  // raw-web
  {
    name: "raw-web",
    port: 3005,
    handler: (req, res) => {
      const readable = new ReadableStream({
        start(controller) {
          req.on("data", (chunk) => {
            controller.enqueue(chunk);
          });
          req.on("end", () => {
            controller.close();
          });
          req.on("error", (err) => {
            controller.error(err);
          });
        },
      });

      readable.pipeTo(
        new WritableStream({
          write(chunk) {
            //
          },
          close() {
            res.end();
          },
          abort() {
            res.end();
          },
        })
      );
    },
  },
  // web
  {
    name: "web",
    port: 3006,
    handler: (req, res) => {
      let size = 0;
      const readable = new ReadableStream({
        start(controller) {
          req.on("data", (chunk) => {
            controller.enqueue(chunk);
          });
          req.on("end", () => {
            controller.close();
          });
          req.on("error", (err) => {
            controller.error(err);
          });
        },
      });

      readable
        .pipeThrough(
          new TransformStream({
            transform(chunk, controller) {
              size += chunk.byteLength;
              controller.enqueue(chunk);
            },
          })
        )
        .pipeTo(
          new WritableStream({
            write(chunk) {
              //
            },
            close() {
              res.end();
            },
            abort() {
              res.end();
            },
          })
        );
    },
  },
];

// If this file is the main module, start the servers
if (import.meta.url === `file://${process.argv[1]}`) {
  let filtered = servers;
  if (process.argv[2]) {
    console.log(`Filtering servers by ${process.argv[2]}`);
    filtered = servers.filter((s) => s.name === process.argv[2]);
  }

  for (const test of filtered) {
    const server = http.createServer(test.handler);
    server.listen(test.port, () => {
      console.log(`Server[${test.name}] listening on port ${test.port}`);
    });
  }
}
