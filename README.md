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
  Total time: 11727.70745400002ms
  Average time: 58.6385372700001ms
  50th percentile: 60.404709000000366ms
  75th percentile: 70.32966699999997ms
  95th percentile: 83.04362500000025ms
  99th percentile: 90.8314170000001ms
  Slowest time: 97.75795800000014ms
Benchmarking stream...
Filtering servers by stream
Server[stream] listening on port 3004
  Total time: 14353.43758399999ms
  Average time: 71.76718791999996ms
  50th percentile: 74.92595900000015ms
  75th percentile: 90.23795900000005ms
  95th percentile: 101.14154200000121ms
  99th percentile: 113.13966699999946ms
  Slowest time: 124.69024999999965ms
Benchmarking raw-web...
Filtering servers by raw-web
Server[raw-web] listening on port 3005
  Total time: 11558.421302000008ms
  Average time: 57.79210651000004ms
  50th percentile: 59.24150000000009ms
  75th percentile: 73.04758299999958ms
  95th percentile: 77.6817919999994ms
  99th percentile: 82.05033299999923ms
  Slowest time: 112.0580829999999ms
Benchmarking web...
Filtering servers by web
Server[web] listening on port 3006
  Total time: 13944.80162499999ms
  Average time: 69.72400812499994ms
  50th percentile: 71.64208399999916ms
  75th percentile: 87.42299999999886ms
  95th percentile: 99.48020800000086ms
  99th percentile: 115.38420899999983ms
  Slowest time: 122.68074999999953ms
Benchmarking web-high-water-mark...
Filtering servers by web-high-water-mark
Server[web-high-water-mark] listening on port 3007
  Total time: 12178.385005999957ms
  Average time: 60.89192502999978ms
  50th percentile: 62.33425000000352ms
  75th percentile: 76.77945800000452ms
  95th percentile: 82.84975000000122ms
  99th percentile: 90.32458300000144ms
  Slowest time: 97.60870799999975ms
```

### Node

Tests were performed using Node.js v20.10.0.

```
Benchmarking raw...
Filtering servers by raw
Server[raw] listening on port 3003
  Total time: 6235.622835934162ms
  Average time: 31.17811417967081ms
  50th percentile: 31.087291955947876ms
  75th percentile: 33.050832986831665ms
  95th percentile: 35.806500017642975ms
  99th percentile: 45.15275001525879ms
  Slowest time: 51.2404580116272ms
Benchmarking stream...
Filtering servers by stream
Server[stream] listening on port 3004
  Total time: 6129.22315788269ms
  Average time: 30.646115789413454ms
  50th percentile: 30.859332978725433ms
  75th percentile: 32.8806249499321ms
  95th percentile: 37.12883299589157ms
  99th percentile: 68.42662501335144ms
  Slowest time: 69.21875ms
Benchmarking raw-web...
Filtering servers by raw-web
Server[raw-web] listening on port 3005
  Total time: 8456.210660338402ms
  Average time: 42.28105330169201ms
  50th percentile: 37.048624992370605ms
  75th percentile: 40.971000015735626ms
  95th percentile: 52.72720801830292ms
  99th percentile: 323.5063329935074ms
  Slowest time: 327.8240000009537ms
Benchmarking web...
Filtering servers by web
Server[web] listening on port 3006
  Total time: 6725.078011333942ms
  Average time: 33.625390056669715ms
  50th percentile: 33.85437500476837ms
  75th percentile: 35.90141695737839ms
  95th percentile: 41.02208399772644ms
  99th percentile: 99.51587498188019ms
  Slowest time: 100.9012919664383ms
Benchmarking web-high-water-mark...
Filtering servers by web-high-water-mark
Server[web-high-water-mark] listening on port 3007
  Total time: 7774.229538977146ms
  Average time: 38.87114769488573ms
  50th percentile: 38.02608299255371ms
  75th percentile: 39.853582978248596ms
  95th percentile: 44.669458985328674ms
  99th percentile: 105.69700002670288ms
  Slowest time: 106.15604203939438ms
```
