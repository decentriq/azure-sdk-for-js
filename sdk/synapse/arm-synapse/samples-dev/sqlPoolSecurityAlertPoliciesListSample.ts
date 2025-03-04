/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get a list of Sql pool's security alert policies.
 *
 * @summary Get a list of Sql pool's security alert policies.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/SqlPoolSecurityAlertPolicies_List.json
 */
async function getASecurityAlertOfASqlAnalyticsPool() {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = "securityalert-6852";
  const workspaceName = "securityalert-2080";
  const sqlPoolName = "testdb";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.sqlPoolSecurityAlertPolicies.list(
    resourceGroupName,
    workspaceName,
    sqlPoolName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

getASecurityAlertOfASqlAnalyticsPool().catch(console.error);
