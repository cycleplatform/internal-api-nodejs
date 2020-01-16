import { Structs, Containers } from "@cycleplatform/cycle-api";
import { ContainerEvent } from "@cycleplatform/cycle-api/dist/resources/containers";

export interface ContainerSummary extends Structs.Resource {
  name: string;
  owner: Structs.OwnerScope;
  environment: Containers.EnvironmentSummary;
  hub_id: Structs.ResourceId;
  stack?: Containers.StackSummary;
  image: Containers.ImageSummary;
  state: Structs.State<Containers.ContainerState>;
  events: Structs.Events<ContainerEvent>;
}
