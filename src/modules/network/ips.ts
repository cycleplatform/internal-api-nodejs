import { Structs } from "@cycleplatform/cycle-api";

export interface IPNet {
  ip: Structs.IP;
  cidr: string;
}

export type Kind = "ipv4" | "ipv6";
export type IPState = "live" | "inactive" | "deleted";
