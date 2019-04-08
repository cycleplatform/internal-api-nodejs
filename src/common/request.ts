import * as http from "http";
import { ErrorResource } from "./error";

const SOCKET_PATH = process.env.SOCKET_PATH || "/var/run/cycle/api/api.sock";
const AUTH_TOKEN = process.env.CYCLE_API_TOKEN || "";
const VERSION = process.env.version || "v1";

/**
 * The result structure of an API request. Can be success or failure
 */
export type ApiResult<T> = ResultSuccess<T> | ResultFail<ErrorResource>;

/** The result of a successful API call */
export interface ResultSuccess<T> {
  ok: true;
  value: T;
}

/** The result of a failed API call */
export interface ResultFail<T> {
  ok: false;
  error: T;
}

export interface RequestProps {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: object;
}

export function makeRequest<T>({
  path,
  data,
  method = "GET",
}: RequestProps): Promise<ApiResult<T>> {
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
          }),
        );
      },
    );
    if (method === "POST") {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}
