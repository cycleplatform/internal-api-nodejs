import { Environment } from "@cycleplatform/internal-api";

jest.setTimeout(99999);

describe("Test Environment Endpoints", () => {
  test("It successfully fetches the environment this instance is a part of", async () => {
    const resp = await Environment.getEnvironment();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch environment: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("id");
  });

  test("It successfully fetches other containers that are part of the same environment as this instance", async () => {
    const resp = await Environment.getEnvironmentContainers();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch containers: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("config"));
  });

  test("It successfully fetches other instances that are part of the same environment as this instance", async () => {
    const resp = await Environment.getEnvironmentInstances();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch instances: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("container_id"));
  });

  test("It successfully fetches services that are part of the same environment as this instance", async () => {
    const resp = await Environment.getEnvironmentServices();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch services: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("discovery");
  });

  // test("It successfully fetches load balancer egress gateways that are part of the same environment as this instance", async () => {
  //   const resp = await Environment.getEnvironmentEgressGateways();
  //   if (!resp.ok) {
  //     throw new Error(
  //       `Unable to fetch egress gateways: ${resp.error.title} - ${resp.error.detail}`
  //     );
  //   }
  //
  //   if (resp.value.data === null) {
  //     return;
  //   }
  //
  //   expect(Array.isArray(resp.value.data)).toBe(true);
  //
  //   resp.value.data.forEach(v => expect(v).toHaveProperty("destinations"));
  // });

  test("It successfully fetches load balancer IP addresses that are part of the same environment as this instance", async () => {
    const resp = await Environment.getEnvironmentIPs();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch IP addresses: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("kind"));
  });
});
