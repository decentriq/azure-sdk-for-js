/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 *
 * @summary Lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-01-01/examples/VirtualNetworkGatewayConnectionGetIkeSas.json
 */
async function getVirtualNetworkGatewayConnectionIkeSa() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "vpngwcn1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.beginGetIkeSasAndWait(
    resourceGroupName,
    virtualNetworkGatewayConnectionName
  );
  console.log(result);
}

getVirtualNetworkGatewayConnectionIkeSa().catch(console.error);
