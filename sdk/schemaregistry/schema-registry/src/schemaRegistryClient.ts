// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DEFAULT_SCOPE, SDK_VERSION } from "./constants";
import {
  GetSchemaByVersionOptions,
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry,
  SchemaRegistryClientOptions,
  SchemaVersion,
} from "./models";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { convertSchemaIdResponse, convertSchemaResponse } from "./conversions";
import { GeneratedSchemaRegistryClient } from "./generated/generatedSchemaRegistryClient";
import { TokenCredential } from "@azure/core-auth";
import { logger } from "./logger";

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient implements SchemaRegistry {
  /** The Schema Registry service fully qualified namespace URL. */
  readonly fullyQualifiedNamespace: string;

  /** Underlying autorest generated client. */
  private readonly _client: GeneratedSchemaRegistryClient;

  /** The tracing client */
  private readonly _tracing: TracingClient;

  /**
   * Creates a new client for Azure Schema Registry service.
   *
   * @param fullyQualifiedNamespace - The Schema Registry service qualified namespace URL, for example
   *                                  https://mynamespace.servicebus.windows.net.
   * @param credential - Credential to authenticate requests to the service.
   * @param options - Options to configure API requests to the service.
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options: SchemaRegistryClientOptions = {}
  ) {
    this.fullyQualifiedNamespace = fullyQualifiedNamespace;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this._client = new GeneratedSchemaRegistryClient(this.fullyQualifiedNamespace, {
      endpoint: this.fullyQualifiedNamespace,
      apiVersion: options.apiVersion,
      ...internalPipelineOptions,
    });

    this._tracing = createTracingClient({
      namespace: "Microsoft.EventHub",
      packageName: "@azure/schema-registry",
      packageVersion: SDK_VERSION,
    });

    const authPolicy = bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_SCOPE });
    this._client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Registers a new schema and returns its ID.
   *
   * If schema of specified name does not exist in the specified group, a schema
   * is created at version 1. If schema of specified name exists already in
   * specified group, schema is created at latest version + 1.
   *
   * @param schema - Schema to register.
   * @returns Registered schema's ID.
   */
  registerSchema(
    schema: SchemaDescription,
    options: RegisterSchemaOptions = {}
  ): Promise<SchemaProperties> {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    return this._tracing.withSpan(
      "SchemaRegistryClient.registerSchema",
      options,
      (updatedOptions) =>
        this._client.schema
          .register(
            groupName,
            schemaName,
            `application/json; serialization=${format}`,
            schemaContent,
            updatedOptions
          )
          .then(convertSchemaIdResponse(format))
    );
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * definition.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID.
   */
  getSchemaProperties(
    schema: SchemaDescription,
    options: GetSchemaPropertiesOptions = {}
  ): Promise<SchemaProperties> {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    return this._tracing.withSpan(
      "SchemaRegistryClient.getSchemaProperties",
      options,
      (updatedOptions) =>
        this._client.schema
          .queryIdByContent(
            groupName,
            schemaName,
            `application/json; serialization=${format}`,
            schemaContent,
            updatedOptions
          )
          .then(convertSchemaIdResponse(format))
    );
  }

  /**
   * Gets an existing schema by ID. If the schema was not found, a RestError with
   * status code 404 will be thrown, which could be caught as follows:
   * 
   * ```js
   * ...
   * } catch (e) {
    if (typeof e === "object" && e.statusCode === 404) {
      ...;
    }
    throw e;
  }
   * ```
   *
   * @param schemaId - Unique schema ID.
   * @returns Schema with given ID.
   */
  getSchema(schemaId: string, options: GetSchemaOptions = {}): Promise<Schema> {
    return this._tracing.withSpan("SchemaRegistryClient.getSchema", options, (updatedOptions) =>
      this._client.schema.getById(schemaId, updatedOptions).then(convertSchemaResponse)
    );
  }

  /**
   * Gets an existing schema by version. If the schema was not found, a RestError with
   * status code 404 will be thrown, which could be caught as follows:
   * 
   * ```js
   * ...
   * } catch (e) {
    if (typeof e === "object" && e.statusCode === 404) {
      ...;
    }
    throw e;
  }
   * ```
   *
   * @param schemaVersion - schema version.
   * @returns Schema with given ID.
   */
  getSchemaByVersion(
    schemaVersion: SchemaVersion,
    options: GetSchemaByVersionOptions = {}
  ): Promise<Schema> {
    const { groupName, name, version } = schemaVersion;
    return this._tracing.withSpan(
      "SchemaRegistryClient.getSchemaByVersion",
      options,
      (updatedOptions) =>
        this._client.schema
          .getSchemaVersion(groupName, name, version, updatedOptions)
          .then(convertSchemaResponse)
    );
  }
}
