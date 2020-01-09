This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# The Traffic Meister

This example of app allows you to filter a dynamic list of items using the item properties.
To build it I started with the basic Create React App boilerplate and added some components to the mix:
- `Redux`: a meaninful state
- `Resynchronize`: add asynchronous handling to the redux store
- `React-redux`: connects the state to react
- `@testing-library/react` && cia: test react and redux with ease
- `antd` or ant-design: simple collection of components to build a fast and realiable set of features on top
- `styled-components`: apply custom styles to any component that needs it whitout to worry about anything else except making useful components.

To complement the structure a set of tests were built along. The selection of what to test and what to just simply avoid, was made with the idea of preventing the common mistakes and not fall on irrelevant tests, I hope I didnt forget any important one!

As it can be seen on the commits, I didnt expend all the 16hs on it, I couldnt find that kind of time to invest on the excercise but I enjoy it nonetheless.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

lints the app code.<br />

## Folder structure

The main folder contains:
- *app* main file
- *service worker* configuration
- Tests set up file and utils,
- `components`, `service` and `state` folders

### Components

Collection of components used on the app to visualize the data

### Service

Service scripts and examples for usage

### State

Redux Store separated by reducer. Every reducer contains its own slector and its imported to the `store.js` file for the store construction.

