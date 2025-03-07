// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import {
  BuildCreatePollerOptions,
  CreatePollerOptions,
  Operation,
  OperationState,
  RestorableOperationState,
  SimplePollerLike,
  StateProxy,
} from "./models";
import { deserializeState, initOperation, pollOperation } from "./operation";
import { POLL_INTERVAL_IN_MS } from "./constants";
import { delayMs } from "./util/delayMs";

const createStateProxy: <TResult, TState extends OperationState<TResult>>() => StateProxy<
  TState,
  TResult
> = () => ({
  /**
   * The state at this point is created to be of type OperationState<TResult>.
   * It will be updated later to be of type TState when the
   * customer-provided callback, `updateState`, is called during polling.
   */
  initState: (config) => ({ status: "running", config } as any),
  setCanceled: (state) => (state.status = "canceled"),
  setError: (state, error) => (state.error = error),
  setResult: (state, result) => (state.result = result),
  setRunning: (state) => (state.status = "running"),
  setSucceeded: (state) => (state.status = "succeeded"),
  setFailed: (state) => (state.status = "failed"),

  getError: (state) => state.error,
  getResult: (state) => state.result,
  isCanceled: (state) => state.status === "canceled",
  isFailed: (state) => state.status === "failed",
  isRunning: (state) => state.status === "running",
  isSucceeded: (state) => state.status === "succeeded",
});

/**
 * Returns a poller factory.
 */
export function buildCreatePoller<TResponse, TResult, TState extends OperationState<TResult>>(
  inputs: BuildCreatePollerOptions<TResponse, TState>
): (
  lro: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
  options?: CreatePollerOptions<TResponse, TResult, TState>
) => Promise<SimplePollerLike<TState, TResult>> {
  const {
    getOperationLocation,
    getStatusFromInitialResponse,
    getStatusFromPollResponse,
    getResourceLocation,
    getPollingInterval,
  } = inputs;
  return async (
    { init, poll }: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
    options?: CreatePollerOptions<TResponse, TResult, TState>
  ) => {
    const {
      processResult,
      updateState,
      withOperationLocation: withOperationLocationCallback,
      intervalInMs = POLL_INTERVAL_IN_MS,
      restoreFrom,
    } = options || {};
    const stateProxy = createStateProxy<TResult, TState>();
    const withOperationLocation = withOperationLocationCallback
      ? (() => {
          let called = false;
          return (operationLocation: string, isUpdated: boolean) => {
            if (isUpdated) withOperationLocationCallback(operationLocation);
            else if (!called) withOperationLocationCallback(operationLocation);
            called = true;
          };
        })()
      : undefined;
    const state: RestorableOperationState<TState> = restoreFrom
      ? deserializeState(restoreFrom)
      : await initOperation({
          init,
          stateProxy,
          processResult,
          getOperationStatus: getStatusFromInitialResponse,
          withOperationLocation,
        });
    let resultPromise: Promise<TResult> | undefined;
    let cancelJob: (() => void) | undefined;
    const abortController = new AbortController();
    // Progress handlers
    type Handler = (state: TState) => void;
    const handlers = new Map<symbol, Handler>();
    const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));

    let currentPollIntervalInMs = intervalInMs;

    const poller: SimplePollerLike<TState, TResult> = {
      getOperationState: () => state,
      getResult: () => state.result,
      isDone: () => ["succeeded", "failed", "canceled"].includes(state.status),
      isStopped: () => resultPromise === undefined,
      stopPolling: () => {
        abortController.abort();
        cancelJob?.();
      },
      toString: () =>
        JSON.stringify({
          state,
        }),
      onProgress: (callback: (state: TState) => void) => {
        const s = Symbol();
        handlers.set(s, callback);
        return () => handlers.delete(s);
      },
      pollUntilDone: (pollOptions?: { abortSignal?: AbortSignalLike }) =>
        (resultPromise ??= (async () => {
          const { abortSignal: inputAbortSignal } = pollOptions || {};
          const { signal: abortSignal } = inputAbortSignal
            ? new AbortController([inputAbortSignal, abortController.signal])
            : abortController;
          if (!poller.isDone()) {
            await poller.poll({ abortSignal });
            while (!poller.isDone()) {
              const delay = delayMs(currentPollIntervalInMs);
              cancelJob = delay.cancel;
              await delay;
              await poller.poll({ abortSignal });
            }
          }
          switch (state.status) {
            case "succeeded": {
              return poller.getResult() as TResult;
            }
            case "canceled": {
              throw new Error("Operation was canceled");
            }
            case "failed": {
              throw state.error;
            }
            case "notStarted":
            case "running": {
              // Unreachable
              throw new Error(`polling completed without succeeding or failing`);
            }
          }
        })().finally(() => {
          resultPromise = undefined;
        })),
      async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<void> {
        await pollOperation({
          poll,
          state,
          stateProxy,
          getOperationLocation,
          withOperationLocation,
          getPollingInterval,
          getOperationStatus: getStatusFromPollResponse,
          getResourceLocation,
          processResult,
          updateState,
          options: pollOptions,
          setDelay: (pollIntervalInMs) => {
            currentPollIntervalInMs = pollIntervalInMs;
          },
        });
        await handleProgressEvents();
        if (state.status === "canceled") {
          throw new Error("Operation was canceled");
        }
        if (state.status === "failed") {
          throw state.error;
        }
      },
    };
    return poller;
  };
}
