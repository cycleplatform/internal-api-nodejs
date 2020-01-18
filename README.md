# Cycle Internal API Client For NodeJS

An API client for NodeJS to access Cycle's Internal API that is mounted inside every container running on the platform.

For detailed documentation, please see the official [Cycle Docs](https://docs.cycle.io/internal-api)

## What is this library?

Inside every container running on Cycle, there is a Unix socket mounted at `/var/run/cycle/api/api.sock`. You can send HTTP requests over this socket to access information about the local environment, access secrets, certificates, and much more. This library is a client for NodeJS to make accessing the Internal API a breeze.

## How do I use it?

**This library can only be used from _inside a container running on Cycle_.**

First, install this library using `npm install @cycleplatform/internal-api`. From there, you can utilize the different modules in order to access information about the platform.

For example, to fetch information about the hub this instance is running in, do:

```typescript
import { Hub } from "@cycleplatform/internal-api";

async function test() {
  const resp = await Hub.getHub();

  if (!resp.ok) {
    throw new Error(
      `Unable to fetch hub: ${resp.error.title} - ${resp.error.detail}`
    );
  }

  console.log("My Hub: ", resp.value.data);
}

test();
```

For more detailed information, see the official docs at [Cycle Docs](https://docs.cycle.io/internal-api).

### Do I need to use Typescript?

Nope! Though you will miss out on many benefits it offers, such as logically ensuring you check for errors before attempting to use a payload.

If we modify our example above to remove error checking:

```typescript
import { Hub } from "@cycleplatform/internal-api";

async function test() {
  const resp = await Hub.getHub();

  // This will produce an error in Typescript, because it can't guarantee that we received a valid response from the API.
  // If you're using plain Javascript, this will still execute, but if you get an error it will crash.
  console.log("My Hub: ", resp.value.data);
}

test();
```

Of course, use whichever you are most comfortable with/works for your project.

## Testing

Due to the fact that this library is only usable from inside a container running on Cycle, and our CLI streaming tools aren't released yet, running `npm test` on this library will create a container complete with Jest and a suite of tests that can be uploaded and run on the platform. It is tagged as `cycleplatform/internal-api-test`. Please deploy onto Cycle and run it before submitting a PR.

## Contributing

We accept issues and PRs from the community! This library is issued under an MIT license so feel free to pull and modify to your needs. Any and all feedback is greatly appreciated!
