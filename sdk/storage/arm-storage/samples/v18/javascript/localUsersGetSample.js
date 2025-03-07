/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Get the local user of the storage account by username.
 *
 * @summary Get the local user of the storage account by username.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2022-05-01/examples/LocalUserGet.json
 */
async function getLocalUser() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res6977";
  const accountName = "sto2527";
  const username = "user1";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsersOperations.get(resourceGroupName, accountName, username);
  console.log(result);
}

getLocalUser().catch(console.error);
