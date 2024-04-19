# stream-transform-benchmark

You can run the benchmark suite using any JS runtime:

```sh
# Create a large test file
dd if=/dev/zero of=large-file-50M.bin bs=50M count=1

# Using bun
bun test.mjs large-file-50M.bin

# Using node
node test.mjs large-file-50M.bin
```
