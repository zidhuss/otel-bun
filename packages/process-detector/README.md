# OpenTelemetry Process Detector for Bun

A Bun-compatible version of the OpenTelemetry Process Detector for Node.

### Motivation

The default process detector included in the SDK sets the following resources for `nodejs`[^1].

```
      [SEMRESATTRS_PROCESS_RUNTIME_VERSION]: process.versions.node,
      [SEMRESATTRS_PROCESS_RUNTIME_NAME]: 'nodejs',
      [SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION]: 'Node.js',
```

This package provides accurate attributes for Bun processes:

```
      [ATTR_PROCESS_RUNTIME_VERSION]: process.versions.bun,
      [ATTR_PROCESS_RUNTIME_NAME]: "bun",
      [ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Bun",
```


## Installation

```
bun add @zidhuss/otel-bun-process-detector
```

## Usage

Explicitly pass in all resource detectors that you want the SDK to use.

```typescript
import { envDetector, hostDetector } from "@opentelemetry/resources"
import { NodeSDK } from "@opentelemetry/sdk-node"
import { processDetector } from "@zidhuss/otel-bun-process-detector"

const sdk = new NodeSDK({
	resourceDetectors: [envDetector, hostDetector, processDetector],
  // ...other configuration options
})
```

[^1]: [NodeJS Process Detector](https://github.com/open-telemetry/opentelemetry-js/blob/2f919a43fd2d8067d39d573c6e03b830dee516f0/packages/opentelemetry-resources/src/detectors/platform/node/ProcessDetectorSync.ts#L50-L52)
