import * as Servers from "./resources/servers";

console.log("connecting in 5s...");

async function test() {
  const resp = await Servers.getServer();
  console.log(resp);
}

test();
