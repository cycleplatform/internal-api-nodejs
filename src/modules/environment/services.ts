import { Containers, Structs } from "@cycleplatform/cycle-api";
import { makeRequest } from "common/request";

export type InstanceSumary = Omit<Containers.Instances.Instance, "events">;

export type ContainerSummary = Omit<
  Containers.Container,
  "identifier" | "volumes" | "config" | "instances" | "stateful" | "role"
>;

export interface ServiceContainer {
  container: ContainerSummary;
  instances: InstanceSumary[];
}

export type ServiceDoc = Structs.TopLevel & {
  data: Record<string, ServiceContainer>;
};

/** Retrieve all services running in the same environment as this instance */
export async function getEnvironmentServices() {
  return makeRequest<ServiceDoc>({
    path: "/environment/services",
  });
}
