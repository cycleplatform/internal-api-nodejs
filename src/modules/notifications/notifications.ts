import WebSocket from "ws";
import { SOCKET_PATH, AUTH_TOKEN, VERSION } from "common/request";
import { Notifications } from "@cycleplatform/cycle-api";

interface ConnectionProps {
  onMessage: (m: Notifications.HubNotification) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: any) => void;
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

  ws.on("message", onMessage);

  if (onError) {
    ws.on("error", err => onError(err));
  }

  if (onOpen) {
    ws.on("open", onOpen);
  }
  if (onClose) {
    ws.on("close", onClose);
  }
}
