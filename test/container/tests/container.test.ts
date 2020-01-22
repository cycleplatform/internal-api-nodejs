import { Container } from "@cycleplatform/internal-api";

jest.setTimeout(99999);

describe("Test Container Endpoints", () => {
  test("It successfully fetches the container this instance is a part of", async () => {
    const resp = await Container.getContainer();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch container: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("id");
  });

  test("It successfully fetches other instances that are part of the same container as this instance", async () => {
    const resp = await Container.getContainerInstances();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch instances: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("container_id"));
  });

  test("It successfully fetches certificates that are part of the same container as this instance", async () => {
    const resp = await Container.getContainerCertificates();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch instances: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(Array.isArray(resp.value.data)).toBe(true);

    resp.value.data.forEach(v => expect(v).toHaveProperty("domains"));
  });
});
