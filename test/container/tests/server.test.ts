import { Server } from "@cycleplatform/internal-api";

jest.setTimeout(99999);

describe("Test Server Endpoints", () => {
  test("It successfully fetches the server this instance is running on", async () => {
    const resp = await Server.getServer();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch server: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("hostname");
  });

  test("It successfully fetches other containers that are running on the same server as this instance", async () => {
    const resp = await Server.getServerContainers();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch containers: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("config"));
  });

  test("It successfully fetches other instances that are running on the same server as this instance", async () => {
    const resp = await Server.getServerInstances();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch instances: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("container_id"));
  });
});
