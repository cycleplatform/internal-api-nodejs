// import * as net from "net";
import * as http from "http";

const SOCKET_PATH = process.env.SOCKET_PATH || "/var/run/cycle/api/api.sock";
const AUTH_TOKEN = process.env.CYCLE_API_TOKEN || "";
const VERSION = process.env.version || "v1";

export interface RequestProps {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: object;
}

export function makeRequest({ path, data, method = "GET" }: RequestProps) {
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
            res(JSON.parse(body));
          } catch (e) {
            res({ error: { title: "Failed to decode body" } });
          }
        });
        resp.on("error", e =>
          res({
            error: { title: "Failed to get response from api", detail: e },
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
