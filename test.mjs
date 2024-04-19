// @ts-check
import http from "node:http";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import { servers } from "./server.mjs";

const ITERATIONS = 200;
const CONCURRENCY = 3;

const groups = ITERATIONS / CONCURRENCY;

if (!process.argv[2]) {
  console.log("Usage: node/bun test.mjs <large-file>");
  process.exit(1);
}

const file = await fs.readFile(process.argv[2]);

for (const server of servers) {
  console.log(`Benchmarking ${server.name}...`);

  const p = spawn(process.argv[0], ["server.mjs", server.name], {
    stdio: "inherit",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  /**
   * @type {number[]}
   */
  let times = [];
  for (let i = 0; i < groups; i++) {
    await Promise.all(
      new Array(CONCURRENCY).fill(null).map(async () => {
        const start = performance.now();
        await new Promise((resolve) => {
          const req = http.request(
            {
              hostname: "localhost",
              port: server.port,
              method: "POST",
              headers: {
                "Content-Type": "application/octet-stream",
              },
            },
            (res) => {
              res.on("data", () => {
                //
              });
              res.on("end", () => {
                resolve(null);
              });
            }
          );

          req.write(file);
          req.end();
        });
        const end = performance.now();

        times.push(end - start);
      })
    );
  }

  const total = times.reduce((acc, curr) => acc + curr, 0);

  console.log(`  Total time: ${total}ms`);
  console.log(`  Average time: ${total / ITERATIONS}ms`);

  // Calculate the percentiles
  times.sort((a, b) => a - b);
  const percentiles = [50, 75, 95, 99];
  for (const percentile of percentiles) {
    const value = times[Math.floor(times.length * (percentile / 100))];
    console.log(`  ${percentile}th percentile: ${value}ms`);
  }

  // Print the slowest time.
  console.log(`  Slowest time: ${times[times.length - 1]}ms`);

  // Stop the server process.
  p.kill();
}
