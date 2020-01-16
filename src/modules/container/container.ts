import { Containers } from "@cycleplatform/cycle-api";
import { makeRequest } from "common/request";

/**
 * Get the container struct for the instance we're in
 */
export function getContainer() {
  return makeRequest<Containers.Single>({
    path: "/container",
  });
}

/**
 * Get all instances of the container for the instance we're in
 */
export function getContainerInstances() {
  return makeRequest<Containers.Instances.Collection>({
    path: "/container/instances",
  });
}
