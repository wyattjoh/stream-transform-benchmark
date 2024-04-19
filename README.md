# stream-transform-benchmark

You can run the benchmark suite using any JS runtime. This was created to
benchmark the impact of measuring the body size.

```sh
# Create a large test file
dd if=/dev/zero of=large-file-50M.bin bs=50M count=1

# Using bun
bun test.mjs large-file-50M.bin

# Using node
node test.mjs large-file-50M.bin
```

## Results

Tests were performed with a 50MB file on a M1 Pro with 32 GB of RAM.

### Bun

Tests were performed using Bun v1.1.3.

```
Benchmarking raw...
Filtering servers by raw
Server[raw] listening on port 3003
  Total time: 12165.096547999998ms
  Average time: 60.82548273999999ms
  50th percentile: 63.33820899999955ms
  75th percentile: 70.68404199999986ms
  95th percentile: 86.1765419999997ms
  99th percentile: 92.62195899999983ms
  Slowest time: 103.63004099999989ms
Benchmarking stream...
Filtering servers by stream
Server[stream] listening on port 3004
  Total time: 11253.881202999994ms
  Average time: 56.269406014999966ms
  50th percentile: 56.95741699999962ms
  75th percentile: 70.4286659999998ms
  95th percentile: 75.34304100000008ms
  99th percentile: 89.04037499999868ms
  Slowest time: 101.14845799999966ms
Benchmarking raw-web...
Filtering servers by raw-web
Server[raw-web] listening on port 3005
  Total time: 14189.097708000041ms
  Average time: 70.94548854000021ms
  50th percentile: 73.53629200000069ms
  75th percentile: 89.9163750000007ms
  95th percentile: 102.7435000000005ms
  99th percentile: 107.32895800000188ms
  Slowest time: 108.44770900000003ms
Benchmarking web...
Filtering servers by web
Server[web] listening on port 3006
  Total time: 14245.093466999999ms
  Average time: 71.22546733499999ms
  50th percentile: 74.94625000000087ms
  75th percentile: 90.32145899999887ms
  95th percentile: 99.6997080000001ms
  99th percentile: 105.92312500000116ms
  Slowest time: 109.62416700000176ms
```

### Node

Tests were performed using Node.js v20.10.0.

```
Benchmarking raw...
Filtering servers by raw
Server[raw] listening on port 3003
  Total time: 6076.753631472588ms
  Average time: 30.383768157362937ms
  50th percentile: 30.325250029563904ms
  75th percentile: 32.18270796537399ms
  95th percentile: 34.84395897388458ms
  99th percentile: 56.436374962329865ms
  Slowest time: 64.27824997901917ms
Benchmarking stream...
Filtering servers by stream
Server[stream] listening on port 3004
  Total time: 6548.548506319523ms
  Average time: 32.742742531597614ms
  50th percentile: 32.854667007923126ms
  75th percentile: 34.899167001247406ms
  95th percentile: 38.27366703748703ms
  99th percentile: 49.95008397102356ms
  Slowest time: 56.798166036605835ms
Benchmarking raw-web...
Filtering servers by raw-web
Server[raw-web] listening on port 3005
  Total time: 6458.272747337818ms
  Average time: 32.29136373668909ms
  50th percentile: 33.59062498807907ms
  75th percentile: 35.25479197502136ms
  95th percentile: 38.17754203081131ms
  99th percentile: 79.8333330154419ms
  Slowest time: 86.52508395910263ms
Benchmarking web...
Filtering servers by web
Server[web] listening on port 3006
  Total time: 7003.671169519424ms
  Average time: 35.01835584759712ms
  50th percentile: 35.586958050727844ms
  75th percentile: 37.694166004657745ms
  95th percentile: 41.45366698503494ms
  99th percentile: 78.9548749923706ms
  Slowest time: 80.06737500429153ms
```
