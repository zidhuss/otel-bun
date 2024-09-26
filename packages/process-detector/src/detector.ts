/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as os from "node:os"
import { diag } from "@opentelemetry/api"
import {
	type DetectorSync,
	Resource,
	type ResourceAttributes,
	type ResourceDetectionConfig,
} from "@opentelemetry/resources"
import {
	ATTR_PROCESS_COMMAND,
	ATTR_PROCESS_COMMAND_ARGS,
	ATTR_PROCESS_EXECUTABLE_NAME,
	ATTR_PROCESS_EXECUTABLE_PATH,
	ATTR_PROCESS_OWNER,
	ATTR_PROCESS_PID,
	ATTR_PROCESS_RUNTIME_DESCRIPTION,
	ATTR_PROCESS_RUNTIME_NAME,
	ATTR_PROCESS_RUNTIME_VERSION,
} from "@opentelemetry/semantic-conventions/incubating"

/**
 * ProcessDetector will be used to detect the resources related to the current bun process.
 */
class ProcessDetector implements DetectorSync {
	detect(_config?: ResourceDetectionConfig): Resource {
		const attributes: ResourceAttributes = {
			[ATTR_PROCESS_PID]: process.pid,
			[ATTR_PROCESS_EXECUTABLE_NAME]: process.title,
			[ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
			[ATTR_PROCESS_COMMAND_ARGS]: [
				process.argv[0],
				...process.execArgv,
				...process.argv.slice(1),
			],
			[ATTR_PROCESS_RUNTIME_VERSION]: process.versions.bun,
			[ATTR_PROCESS_RUNTIME_NAME]: "bun",
			[ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Bun",
		}

		if (process.argv.length > 1) {
			attributes[ATTR_PROCESS_COMMAND] = process.argv[1]
		}

		try {
			const userInfo = os.userInfo()
			attributes[ATTR_PROCESS_OWNER] = userInfo.username
		} catch (e) {
			diag.debug(`error obtaining process owner: ${e}`)
		}

		return new Resource(attributes)
	}
}

export const processDetector: DetectorSync = new ProcessDetector()
