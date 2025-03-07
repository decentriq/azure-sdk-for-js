/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TagsObject, NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates a VirtualWAN tags.
 *
 * @summary Updates a VirtualWAN tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-01-01/examples/VirtualWANUpdateTags.json
 */
async function virtualWanUpdate() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const virtualWANName = "wan1";
  const wANParameters: TagsObject = {
    tags: { key1: "value1", key2: "value2" }
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualWans.updateTags(
    resourceGroupName,
    virtualWANName,
    wANParameters
  );
  console.log(result);
}

virtualWanUpdate().catch(console.error);
