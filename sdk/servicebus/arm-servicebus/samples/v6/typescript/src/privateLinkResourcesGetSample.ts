/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets lists of resources that supports Privatelinks.
 *
 * @summary Gets lists of resources that supports Privatelinks.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/examples/NameSpaces/PrivateLinkResourcesGet.json
 */
async function nameSpacePrivateLinkResourcesGet() {
  const subscriptionId = "subID";
  const resourceGroupName = "ArunMonocle";
  const namespaceName = "sdk-Namespace-2924";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    resourceGroupName,
    namespaceName
  );
  console.log(result);
}

nameSpacePrivateLinkResourcesGet().catch(console.error);
