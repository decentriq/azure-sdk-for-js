// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroResourceLocationConfig, RawResponse } from "../../http/models";

/**
 * Options for the LRO poller.
 */
export interface LroEngineOptions<TResult, TState> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
  /**
   * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
   */
  lroResourceLocationConfig?: LroResourceLocationConfig;
  /**
   * A function to process the result of the LRO.
   */
  processResult?: (result: unknown, state: TState) => TResult;
  /**
   * A function to process the state of the LRO.
   */
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  /**
   * A predicate to determine whether the LRO finished processing.
   */
  isDone?: (lastResponse: unknown, state: TState) => boolean;
}

export interface PollerConfig {
  intervalInMs: number;
}
