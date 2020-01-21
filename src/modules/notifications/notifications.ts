import WebSocket from "ws";
import { SOCKET_PATH, AUTH_TOKEN, VERSION } from "common/request";
import { Notifications, Errors } from "@cycleplatform/cycle-api";

interface ConnectionProps {
  onMessage?: (m: Notifications.HubNotification) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Errors.ErrorResource) => void;
}

export function connectToNotifications({
  onMessage,
  onOpen,
  onClose,
  onError,
}: ConnectionProps) {
  const ws = new WebSocket(
    `ws+unix://${SOCKET_PATH}:/${VERSION}/notifications`,
    {
      headers: {
        "x-cycle-token": AUTH_TOKEN,
      },
    }
  );

  if (onMessage) {
    ws.on("message", m => {
      try {
        const val = JSON.parse(m.toString());
        onMessage(val);
      } catch (e) {
        if (onError) {
          onError({
            title: "Error parsing payload",
            detail: "Unable to JSON parse the received payload."
          })
          if (__DEV__) {
            console.error(`Error parsing notification payload. Expected JSON, but got: "${m}"`)
          }
        }
      }
    });
  }

  if (onError) {
    ws.on("error", err => onError({ title: err.name, detail: err.message }));
  }

  if (onOpen) {
    ws.on("open", onOpen);
  }
  if (onClose) {
    ws.on("close", onClose);
  }

  return ws;
}
