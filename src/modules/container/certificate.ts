import { Structs } from "@cycleplatform/cycle-api";
import { makeRequest } from 'common/request';

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
  return makeRequest<Structs.CollectionDoc<Certificate>>({
    path: "/container/certificates",
  });
}
