// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { NamedEntityInfo } from "./internal";
import { StringInfo } from "./internal";
export interface MapKeyInfo extends NamedEntityInfo {
  entityKind: "mapkey";
  schema?: StringInfo;
}
