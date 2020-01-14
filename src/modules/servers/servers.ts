import { makeRequest } from "common/request";
import { Containers, Infrastructure } from "@cycleplatform/cycle-api";

/** Retrieve information about the server this instance is running on */
export async function getServer() {
  return makeRequest<Infrastructure.Servers.Single>({
    path: "/server",
  });
}

/** Retrieve information about the server this instance is running on */
export async function getServerInstances() {
  return makeRequest<Containers.Instances.Collection>({
    path: "/server/instances",
  });
}
