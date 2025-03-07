/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ThrottledRequestsInput,
  ComputeManagementClient
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Export logs that show total throttled Api requests for this subscription in the given time window.
 *
 * @summary Export logs that show total throttled Api requests for this subscription in the given time window.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2022-03-01/ComputeRP/examples/logAnalyticExamples/LogAnalytics_ThrottledRequests.json
 */
async function exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod() {
  const subscriptionId = "{subscription-id}";
  const location = "westus";
  const parameters: ThrottledRequestsInput = {
    blobContainerSasUri: "https://somesasuri",
    fromTime: new Date("2018-01-21T01:54:06.862601Z"),
    groupByClientApplicationId: false,
    groupByOperationName: true,
    groupByResourceName: false,
    groupByUserAgent: false,
    toTime: new Date("2018-01-23T01:54:06.862601Z")
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.beginExportThrottledRequestsAndWait(
    location,
    parameters
  );
  console.log(result);
}

exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod().catch(
  console.error
);
