import { Structs } from "@cycleplatform/cycle-api";

export interface NullableSingleDoc<T extends Structs.Resource | string | null>
  extends Structs.TopLevel {
  data: T | null;
}

export interface NullableCollectionDoc<T extends Structs.Resource>
  extends Structs.TopLevel {
  data: T[] | null;
}
