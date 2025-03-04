/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 *
 * @summary Update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2022-08-15/examples/CosmosDBCassandraKeyspaceThroughputUpdate.json
 */
async function cosmosDbCassandraKeyspaceThroughputUpdate() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const updateThroughputParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.beginUpdateCassandraKeyspaceThroughputAndWait(
    resourceGroupName,
    accountName,
    keyspaceName,
    updateThroughputParameters
  );
  console.log(result);
}

cosmosDbCassandraKeyspaceThroughputUpdate().catch(console.error);
