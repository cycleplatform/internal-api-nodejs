const internalApi = require("@cycleplatform/cycle-internal-api");

async function test() {
  internalApi.connectToNotifications({
    onMessage: data => console.log("DATA RECEIVED", data),
    onError: err => console.log("ERROR RECEIVED", err),
    onOpen: () => console.log("CONNECTED TO CYCLE NOTIFICATIONS"),
    onClose: () => console.log("DISCONNECTED FROM CYCLE NOTIFICATIONS"),
  });
}

test();
