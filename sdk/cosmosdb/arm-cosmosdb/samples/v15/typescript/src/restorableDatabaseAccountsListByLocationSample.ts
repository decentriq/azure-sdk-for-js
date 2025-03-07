/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all the restorable Azure Cosmos DB database accounts available under the subscription and in a region.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 *
 * @summary Lists all the restorable Azure Cosmos DB database accounts available under the subscription and in a region.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2022-08-15/examples/CosmosDBRestorableDatabaseAccountList.json
 */
async function cosmosDbRestorableDatabaseAccountList() {
  const subscriptionId = "subid";
  const location = "West US";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.restorableDatabaseAccounts.listByLocation(
    location
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

cosmosDbRestorableDatabaseAccountList().catch(console.error);
