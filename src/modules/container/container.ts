import { Containers } from "@cycleplatform/cycle-api";
import { makeRequest } from "common/request";

export function getContainer() {
  return makeRequest<Containers.Single>({
    path: "/container",
  });
}
