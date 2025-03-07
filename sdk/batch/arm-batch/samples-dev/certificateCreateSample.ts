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
  CertificateCreateOrUpdateParameters,
  BatchManagementClient
} from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates a new certificate inside the specified account.
 *
 * @summary Creates a new certificate inside the specified account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2022-06-01/examples/CertificateCreate_Full.json
 */
async function createCertificateFull() {
  const subscriptionId = "subid";
  const resourceGroupName = "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const certificateName = "sha1-0a0e4f50d51beadeac1d35afc5116098e7902e6e";
  const parameters: CertificateCreateOrUpdateParameters = {
    format: "Pfx",
    data: "MIIJsgIBAzCCCW4GCSqGSIb3DQE...",
    password: "<ExamplePassword>",
    thumbprint: "0a0e4f50d51beadeac1d35afc5116098e7902e6e",
    thumbprintAlgorithm: "sha1"
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.certificateOperations.create(
    resourceGroupName,
    accountName,
    certificateName,
    parameters
  );
  console.log(result);
}

createCertificateFull().catch(console.error);

/**
 * This sample demonstrates how to Creates a new certificate inside the specified account.
 *
 * @summary Creates a new certificate inside the specified account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2022-06-01/examples/CertificateCreate_MinimalCer.json
 */
async function createCertificateMinimalCer() {
  const subscriptionId = "subid";
  const resourceGroupName = "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const certificateName = "sha1-0a0e4f50d51beadeac1d35afc5116098e7902e6e";
  const parameters: CertificateCreateOrUpdateParameters = {
    format: "Cer",
    data: "MIICrjCCAZagAwI..."
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.certificateOperations.create(
    resourceGroupName,
    accountName,
    certificateName,
    parameters
  );
  console.log(result);
}

createCertificateMinimalCer().catch(console.error);

/**
 * This sample demonstrates how to Creates a new certificate inside the specified account.
 *
 * @summary Creates a new certificate inside the specified account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2022-06-01/examples/CertificateCreate_Minimal.json
 */
async function createCertificateMinimalPfx() {
  const subscriptionId = "subid";
  const resourceGroupName = "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const certificateName = "sha1-0a0e4f50d51beadeac1d35afc5116098e7902e6e";
  const parameters: CertificateCreateOrUpdateParameters = {
    data: "MIIJsgIBAzCCCW4GCSqGSIb3DQE...",
    password: "<ExamplePassword>"
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.certificateOperations.create(
    resourceGroupName,
    accountName,
    certificateName,
    parameters
  );
  console.log(result);
}

createCertificateMinimalPfx().catch(console.error);
