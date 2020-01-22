import { Hub } from "@cycleplatform/internal-api";

jest.setTimeout(99999);

describe("Test Hub Endpoints", () => {
  test("It successfully fetches the hub this instance is a part of", async () => {
    const resp = await Hub.getHub();
    if (!resp.ok) {
      throw new Error(
        `Unable to fetch hub: ${resp.error.title} - ${resp.error.detail}`
      );
    }

    expect(resp.value.data).toHaveProperty("providers");
  });
});
