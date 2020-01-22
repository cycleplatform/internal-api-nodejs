import { Structs } from "@cycleplatform/cycle-api";
import { makeRequest } from "common/request";
import { NullableCollectionDoc } from "common/structs";

export interface Certificate extends Structs.Resource {
  domains: string[];
  private_key: string;
  bundle: string;
  csr: string;
  issuer_certificate: string;
  hub_id: string;
}

/**
 * Get the generated certificates for the container of the instance we're in
 */
export function getContainerCertificates() {
  return makeRequest<NullableCollectionDoc<Certificate>>({
    path: "/container/certificates",
  });
}
