import * as http from "http";
import { Request } from "@cycleplatform/cycle-api";

export const SOCKET_PATH =
  process.env.SOCKET_PATH || "/var/run/cycle/api/api.sock";
export const AUTH_TOKEN = process.env.CYCLE_API_TOKEN || "";
export const VERSION = process.env.version || "v1";

export interface RequestProps {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: object;
}

export function makeRequest<T>({
  path,
  data,
  method = "GET",
}: RequestProps): Promise<Request.ApiResult<T>> {
  return new Promise(res => {
    const req = http.request(
      {
        method,
        path: `/${VERSION}${path}`,
        headers: {
          "X-CYCLE-TOKEN": AUTH_TOKEN,
        },
        // createConnection: () => socket,
        socketPath: SOCKET_PATH,
      },
      resp => {
        let body = "";
        resp.on("data", data => {
          body += data;
        });

        resp.on("end", () => {
          try {
            res({ ok: true, value: JSON.parse(body) });
          } catch (e) {
            res({ ok: false, error: { title: "Failed to decode body" } });
          }
        });
        resp.on("error", e =>
          res({
            ok: false,
            error: {
              title: "Failed to get response from api",
              detail: e.message,
            },
          })
        );
      }
    );
    if (method === "POST") {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}
