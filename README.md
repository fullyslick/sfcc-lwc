# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## SFDX VSCode CLI Commands

- Create a Lightning Web Component

```sh
sf lightning generate component -n myFirstWebComponent -d force-app/main/default/lwc --type lwc
```

These are the parameters you used in the command.

    -n — This defines the name of the Lightning web component folder and its files.
    -d — This defines the target directory where the Lightning web component should be created. The target directory must be named lwc
    --type — This specifies that you want to create a Lightning Web Component.

- Deploy component:

```sh
sf project deploy start
```

- Start local server (requires installation of https://www.npmjs.com/package/@salesforce/lwc-dev-server)

```sh
sfdx force:lightning:lwc:start
```

- Install **@salesforce/sfdx-lwc-jest** to perform unit testing of LWC with Jest.
  If you receive an error “No matching version found for prettier-plugin-apex@^1.10.1”, update the package.json file devDependencies prettier-plugin-apex to ^1.10.0.

  ```sh
    sf force lightning lwc test setup
  ```

  Alternativly you can install like this:

  ```sh
  npm install @salesforce/sfdx-lwc-jest --save-dev
  ```

- Run Jest Unit Tests
  In the Visual Studio Code terminal enter the command bellow. If you run it in the top level directory it will run all unit tests for all components. Navigate to a component folder or pass a component folder location, to run a unit test only for a specific component.

  ```sh
  npm run test:unit
  ```

  or

  ```sh
  node node_modules/@salesforce/sfdx-lwc-jest/bin/sfdx-lwc-jest
  ```

  Run Jest Unit Tests in watch mode:

  ```sh
  npm run test:unit:watch
  ```

  - Run Jest Unit Tests and show the tested files:

  ```sh
  npm run test:unit:coverage
  ```

  If you get an <span style="color: red">“Invalid sourceApiVersion”</span> error it is due to an updated VS Code Extension with the latest Salesforce release.
  error Invalid sourceApiVersion found in sfdx-project.json. Expected 51.0, found 52.0
  In Visual Studio Code, in the top-level directory, open **sfdx-project.json**.
  Update the line of code with “sourceApiVersion” to the Expected version from the error message you received.

  ```json
  "sourceApiVersion": "51.0"
  ```

- [Debugging Jest Unit Tests](https://developer.salesforce.com/docs/platform/lwc/guide/unit-testing-using-jest-debug-tests.html)

# Summary

## Set Up Your Salesforce Developer Experience Environment

- go to trailhead, top right **Hands-On Orgs**
- Create Playground
- **Get Your Login Credentials** -> Reset pass and username and save them

## SFDX Plugin

Helps creating lwc - projects, component, deployment, etc

- **SFDX: Create Project**
- **SFDX: Create Lightning Web Component**
- **SFDX: Create Apex Class**

1. Create Apex Class - right click on `force-app/main/default` folder and click **SFDX: Create Apex Class**

- **SFDX: Authorize an Org**

1. In Visual Studio Code, open the Command Palette by pressing Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS).
2. Type SFDX.
3. Select SFDX: Authorize an Org.
4. Press Enter to accept the Project Default login URL option.
5. Press Enter to accept the default alias.
6. This opens the Salesforce login in a separate browser window.
7. Log in using your Trailhead Playground credentials.
8. If prompted to allow access, click Allow.

## Local Dev Server Plugin

Creates localhost to test components locally before deploying. However some components may not work properly, because more context is required (record page for example). Localhost can get or set data from and to Salesforce Developer Experience Environment.

[Set Up LWC Local Development](https://developer.salesforce.com/tools/vscode/en/localdev/set-up-lwc-local-dev)
[Documentation](https://developer.salesforce.com/tools/vscode/en/localdev/lwclocaldev)

Requires:

- [node-gyp](https://github.com/nodejs/node-gyp)
- Python
- VSCode Build Tools

Run Local Server Command:

```sh
sfdx force:lightning:lwc:start
```

## LWC Concepts

- Basic Syntax - HTML Template, JS Props and Methods - [Hello World](https://github.com/fullyslick/sfcc-lwc/commit/0ca5afe1d6c6ce9e6856e191357a2b2fb9beeadd)
- [Add your custom component to other component](https://github.com/fullyslick/sfcc-lwc/commit/5c008f8f8e2be2eab5733416012fb8f39fd16a98)
- [Out of the box Lightning Components](https://github.com/fullyslick/sfcc-lwc/commit/cbfdbc20cf250b24eb2307b8c6eb7f37744d0841)
- [XML Configuration](https://github.com/fullyslick/sfcc-lwc/commit/604bb31b947dabf7f6250553d6eb1d3866f59945#diff-aaf8d7989dd10fdcab4f12f4b0de87fe2e36c53ecfa386d150691f966a79dace)
- [Life Cycle Hooks](https://github.com/fullyslick/sfcc-lwc/commit/d7a46956bc315507a2f13fbb9b23f9bc5b493f04)
- [Passing Props From Parent to Child (Exposing Props)](https://github.com/fullyslick/sfcc-lwc/commit/6c94774046481818e5c5bfb640cc73dd27613b1d)
- [Lifting Data From Child to Parent](https://github.com/fullyslick/sfcc-lwc/commit/172259affcb14480648b3e5ce9076d0758f00cd0)
- [More on event bubbling in LWC](https://developer.salesforce.com/blogs/2021/08/how-events-bubble-in-lightning-web-components)
- [How to use getters and setters](https://github.com/fullyslick/sfcc-lwc/commit/cdc8473207c3342eff07045ebb73c913f4ed6b7b?diff=unified)
- [Style components and using Lightning Design System Styles classes](https://github.com/fullyslick/sfcc-lwc/commit/ce678225e60f1bd2e69834e0671bb668f1d9ee6d)
- [Read or Modify SFCC Data with Record Form Base Components](https://github.com/fullyslick/sfcc-lwc/commit/13861de0336a337c249732d561c5e145c1361df6)
- [Read SFCC Data with LDS Wire Adapters](https://github.com/fullyslick/sfcc-lwc/commit/69dcdb9362ed04672234c7fb257c203a4fd99d9f)
- [Read SFCC Data with LDS Wire Adapters using Function](https://github.com/fullyslick/sfcc-lwc/commit/7188b5c14f3d52869d4a81d59911c5feeb39bd6e)
- [Modify SFCC Data with LDS Functions](https://github.com/fullyslick/sfcc-lwc/commit/e25aeb49449a3f91df682535973173c133b21b7e)
- [Get data from SFCC with APEX using @wire](https://github.com/fullyslick/sfcc-lwc/commit/d9883f6c8dd7029be13cac3782f4b17bc88ff0bd)
- [Get data from SFCC by calling Apex method imperatively](https://github.com/fullyslick/sfcc-lwc/commit/38be9f95ff7f77109132ce12363ddfd7527afda8)
- [Helper function from LWC example repo to extract errors from Apex call](https://github.com/fullyslick/sfcc-lwc/commit/470ca74d5fef4b80c5bbf76a2180d1f081848c4b)
- [Forces error to simulate error handling](https://github.com/fullyslick/sfcc-lwc/commit/fb1eb3bc2e13b5ff5dd5e6b42923e62df08d1681)
- [Handling Errors on Wired Properties](https://github.com/fullyslick/sfcc-lwc/commit/24852f026d2b963ddeee1a2c15a55d41386db684)
- [Handling Errors on Wired Functions](https://github.com/fullyslick/sfcc-lwc/commit/0a378a8fe49e9c7c5ee5533b2c74feaad19bc19b)
- [Handling Errors When Calling a Function Imperatively](https://github.com/fullyslick/sfcc-lwc/commit/f85fa089a0f1a52b0dd74c982e65fd51376a9a51)
- [Write a Basic Test](https://github.com/fullyslick/sfcc-lwc/commit/8575c33896c5aa2d8203a96b153ecb42f913b56b)
- [Testing Component Property and DOM Node text](https://github.com/fullyslick/sfcc-lwc/commit/ebb48b61a46ec5df86cf77776e7b6fb3b696163c)
- [Test Asynchronous DOM Updates](https://github.com/fullyslick/sfcc-lwc/commit/94c0868bab424ae75b9b1ef4d591fb1a0a2c21f5)
- [Test Asynchronous DOM Updates by Modifying Input Value](https://github.com/fullyslick/sfcc-lwc/commit/e7dc0f8bb54461f51cfff0242e7f4741e1afeeaa)
- [Testing @wire Service - using the Generic Wire Adapter](https://github.com/fullyslick/sfcc-lwc/commit/205b8aabb7721b64caa49d6c3b8fc5a55b1f6a55)
- [Testing @wire Service - using the Lightning Data Service Wire Adapter](https://github.com/fullyslick/sfcc-lwc/commit/660841ff2c1bd19ace4bb6da900813c072af4008)
- [Testing @wire Service - using Apex Wire Adapter Simulation](https://github.com/fullyslick/sfcc-lwc/commit/21aeac672d901e8a52628cc52b76591bd3387e94)
- [Test Base Component - Mocking (Override) Base Components Stubs](https://github.com/fullyslick/sfcc-lwc/commit/5fce200a406c3765ed246ada98fd6d24bc1a29ec)
- [Test Components From Other Namespace - Mocking Other Namespace Components](https://github.com/fullyslick/sfcc-lwc/commit/a78af37d6bff21ff5fda1a56bdc09c8e8d47a6b9)
