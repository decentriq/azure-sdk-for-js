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
  PrivateLinkConnectionApprovalRequestResource,
  DataFactoryManagementClient
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Approves or rejects a private endpoint connection
 *
 * @summary Approves or rejects a private endpoint connection
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ApproveRejectPrivateEndpointConnection.json
 */
async function approvesOrRejectsAPrivateEndpointConnectionForAFactory() {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const privateEndpointConnectionName = "connection";
  const privateEndpointWrapper: PrivateLinkConnectionApprovalRequestResource = {
    properties: {
      privateEndpoint: {
        id:
          "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.DataFactory/factories/exampleFactoryName/privateEndpoints/myPrivateEndpoint"
      },
      privateLinkServiceConnectionState: {
        description: "Approved by admin.",
        actionsRequired: "",
        status: "Approved"
      }
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.createOrUpdate(
    resourceGroupName,
    factoryName,
    privateEndpointConnectionName,
    privateEndpointWrapper
  );
  console.log(result);
}

approvesOrRejectsAPrivateEndpointConnectionForAFactory().catch(console.error);
