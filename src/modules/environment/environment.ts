import { makeRequest } from "common/request";
import { Environments, Containers } from "@cycleplatform/cycle-api";

/** Retrieve information about the environment this instance is running in */
export async function getEnvironment() {
  return makeRequest<Environments.Single>({
    path: "/environment",
  });
}

/** Retrieve all instances running in the same environment as this instance */
export async function getEnvironmentInstances() {
  return makeRequest<Containers.Instances.Collection>({
    path: "/environment/instances",
  });
}

/** Retrieve all instances running in the same environment as this instance */
export async function getEnvironmentServices() {
  return makeRequest<Containers.Instances.Collection>({
    path: "/environment/instances",
  });
}

export async function getEnvironmentEgressGateways() {}
