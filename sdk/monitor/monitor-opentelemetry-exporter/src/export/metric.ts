// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { diag } from "@opentelemetry/api";
import {
  AggregationTemporality,
  InstrumentType,
  PushMetricExporter,
  ResourceMetrics,
} from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base";
import { AzureExporterConfig } from "../config";
import { TelemetryItem as Envelope } from "../generated";
import { resourceMetricsToEnvelope } from "../utils/metricUtils";

/**
 * Azure Monitor OpenTelemetry Metric Exporter.
 */
export class AzureMonitorMetricExporter
  extends AzureMonitorBaseExporter
  implements PushMetricExporter
{
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  /**
   * Aggregation temporality.
   */
  private _aggregationTemporality: AggregationTemporality;

  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */
  constructor(options: AzureExporterConfig = {}) {
    super(options);
    this._aggregationTemporality = AggregationTemporality.CUMULATIVE;
    diag.debug("AzureMonitorMetricExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry resource metrics.
   * @param metrics - Resource metrics to export.
   * @param resultCallback - Result callback.
   */
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    if (this._isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }
    diag.info(`Exporting ${metrics.scopeMetrics.length} metrics(s). Converting to envelopes...`);

    let envelopes: Envelope[] = resourceMetricsToEnvelope(metrics, this._instrumentationKey);
    resultCallback(await this._exportEnvelopes(envelopes));
  }

  /**
   * Shutdown AzureMonitorMetricExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorMetricExporter shutting down");
    return this._shutdown();
  }

  /**
   * Select aggregation temporality
   */
  public selectAggregationTemporality(_instrumentType: InstrumentType): AggregationTemporality {
    return this._aggregationTemporality;
  }

  /**
   * Force flush
   */
  public async forceFlush() {
    return Promise.resolve();
  }
}
