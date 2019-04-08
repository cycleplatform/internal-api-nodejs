import { makeRequest } from "../../common/request";
import {
  Resource,
  OwnerScope,
  ResourceId,
  State,
  Events,
  SingleDoc,
  CollectionDoc,
} from "../../common/structs";
import { Instance } from "../instances";

export type ProviderIdentifier =
  | "packet"
  | "vultr"
  | "digital-ocean"
  | "aws"
  | "azure";

export type ServerState =
  | "new"
  | "live"
  | "provisioning"
  | "offline"
  | "deleting"
  | "deleted";

export interface Server extends Resource {
  hostname: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  provider: ServerProvider;
  location_id: ResourceId;
  model_id: ResourceId;
  node_id: ResourceId | null;
  tags: string[];
  state: State<ServerState>;
  events: Events;
}

export interface ServerProvider {
  identifier: ProviderIdentifier;
  model: string;
  location: string;
  server: string;
}

/** Retrieve information about the server this instance is running on */
export async function getServer() {
  return makeRequest<SingleDoc<Server>>({
    path: "/server",
  });
}

/** Retrieve information about the server this instance is running on */
export async function getServerIinstances() {
  return makeRequest<CollectionDoc<Instance>>({
    path: "/server/instances",
  });
}
