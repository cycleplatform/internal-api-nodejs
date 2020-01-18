import { Container } from "@cycleplatform/cycle-internal-api";

jest.setTimeout(99999);

describe("Test Container Internal API", () => {
  test("It successfully fetches the container over the internal API", async () => {
    const resp = await Container.getContainer();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch container: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("id");
  });
});
