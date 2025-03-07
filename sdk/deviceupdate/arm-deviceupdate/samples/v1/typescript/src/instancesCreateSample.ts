/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Instance, DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates or updates instance.
 *
 * @summary Creates or updates instance.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2022-10-01/examples/Instances/Instances_Create.json
 */
async function createsOrUpdatesInstance() {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "test-rg";
  const accountName = "contoso";
  const instanceName = "blue";
  const instance: Instance = {
    diagnosticStorageProperties: {
      authenticationType: "KeyBased",
      connectionString: "string",
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/adu-resource-group/providers/Microsoft.Storage/storageAccounts/testAccount"
    },
    enableDiagnostics: false,
    iotHubs: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Devices/IotHubs/blue-contoso-hub"
      }
    ],
    location: "westus2"
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.instances.beginCreateAndWait(
    resourceGroupName,
    accountName,
    instanceName,
    instance
  );
  console.log(result);
}

createsOrUpdatesInstance().catch(console.error);
