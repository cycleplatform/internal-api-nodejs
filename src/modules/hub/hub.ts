import { makeRequest } from "common/request";
import { Hubs } from "@cycleplatform/cycle-api";

/**
 * Get the hub for the instance we're in
 */
export function getHub() {
  return makeRequest<Hubs.Single>({
    path: "/hub",
  });
}
