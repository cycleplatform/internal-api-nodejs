import { makeRequest } from "common/request";
import {
  Environments,
  Containers,
  Infrastructure,
  Structs,
} from "@cycleplatform/cycle-api";

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

export async function getEnvironmentIPs() {
  return makeRequest<Structs.CollectionDoc<Infrastructure.IPs.IP>>({
    path: "/environment/ips",
  });
}
