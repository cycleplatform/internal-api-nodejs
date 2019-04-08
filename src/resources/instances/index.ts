import {
  Resource,
  OwnerScope,
  ResourceId,
  State,
  Events,
} from "../../common/structs";
import { IPNet } from "../network/ips";
import { ProviderIdentifier } from "../servers";

export type InstanceState =
  | "new"
  | "starting"
  | "reimaging"
  | "running"
  | "stopping"
  | "stopped"
  | "failed"
  | "deleting"
  | "deleted";

/**
 * Instance status
 * @param active this instance can be started/stopped &nbsp;
 * @param purge this instance should be deleted
 * @param hibernate this instance is active but not allowed to run
 */
export type ReadyState = "active" | "purge" | "hibernate";
export type InstanceEvent = "first_boot" | "started";

export enum Service {
  SRVC_DISCOVERY = "discovery",
  SRVC_VPN = "vpn",
  SRVC_VPN_LOGIN_AGENT = "vpn-login-agent",
}

export interface Instance extends Resource {
  owner: OwnerScope;
  hub_id: ResourceId;
  container_id: ResourceId;
  location_id: ResourceId;
  environment: EnvironmentSummary;
  stateful: Stateful;
  provider: ProviderSummary;
  server_id: ResourceId;
  ready_state: ReadyState;
  hostname: string;
  service: Service | null;
  state: State<InstanceState>;
  events: Events<InstanceEvent>;
}

export interface EnvironmentSummary {
  id: ResourceId;
  subnet: string;
  ipv6: IPNet | null;
  legacy: Legacy | null;
}

export interface Legacy {
  host: number;
  ipv4: IPNet | null;
}

export interface Stateful {
  id: number;
  base_hostname: string;
}

export interface LocationProvider {
  identifier: ProviderIdentifier;
  location: string;
  code: string;
}

export interface ProviderSummary {
  identifier: ProviderIdentifier;
  location: LocationProvider;
}
