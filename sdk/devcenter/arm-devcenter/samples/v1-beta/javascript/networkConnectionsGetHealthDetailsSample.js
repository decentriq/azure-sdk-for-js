/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Gets health check status details.
 *
 * @summary Gets health check status details.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/preview/2022-08-01-preview/examples/NetworkConnections_GetHealthDetails.json
 */
async function networkConnectionsGetHealthDetails() {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "rg1";
  const networkConnectionName = "{networkConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.getHealthDetails(
    resourceGroupName,
    networkConnectionName
  );
  console.log(result);
}

networkConnectionsGetHealthDetails().catch(console.error);
