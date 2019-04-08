import { makeRequest } from "../../common/request";

export async function getServer() {
  return makeRequest({
    path: "/server",
  });
}
