import { makeRequest } from "common/request";
import {
  Environments,
  Containers,
  Infrastructure,
  Structs,
} from "@cycleplatform/cycle-api";
// import { NullableCollectionDoc } from "common/structs";

/** Retrieve information about the environment this instance is running in */
export async function getEnvironment() {
  return makeRequest<Environments.Single>({
    path: "/environment",
  });
}

/** Retrieve all containers running in the same environment as this instance */
export async function getEnvironmentContainers() {
  return makeRequest<Containers.Collection>({
    path: "/environment/containers",
  });
}

/** Retrieve all instances running in the same environment as this instance */
export async function getEnvironmentInstances() {
  return makeRequest<Containers.Instances.Collection>({
    path: "/environment/instances",
  });
}

// /** Retrieve the egress gateways that have been configured for the load balancer that this instance is behind */
// export async function getEnvironmentEgressGateways() {
//   return makeRequest<
//     NullableCollectionDoc<Environments.Services.EgressGateway>
//   >({
//     path: "/environment/egress-gateways",
//   });
// }

export async function getEnvironmentIPs() {
  return makeRequest<Structs.CollectionDoc<Infrastructure.IPs.IP>>({
    path: "/environment/ips",
  });
}
