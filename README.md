<<<<<<< HEAD
<<<<<<< HEAD
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
# Country-statistics-and-weather-page
React and API practice
This app functionality was built entirely in react.
This is a task for practice and every change and step made to the project was initially updated here: https://github.com/obasemola/Deep-Dive-Into-Modern-Web-Development
The project was built with React.
The idea is to first render a search input field.
Whenever the value of the input field changes (onChange), an API call is made to restcountries.eu to get some statistics.
The change made in the input field is supposed to be the country for which the user needs statistics and weather report.
However, the code is written such that whenever there is a change in the input field, an effect is triggered to make the API call for the country statistics.
The page is also designed such that everytime the change is made to the input field, the API checks whether there is any country name that contains the string typed in the input field.
If the results are more than 10, then the user gets a response to provide more spcific search parameter.
If the results are less than 10 but more than one, then the page provides a list of country names that include the search parameter typed in so far.
If there is only one country that fulfils this search parameter, then the code will do 2 things:
  1. It will render more detailed statictics about the country.
  2. It will make another API call to weatherstack API and update the page to also show some weather information about the country in question (in addition to the country statistics).
>>>>>>> 85cd5706d77b6b963904576febb5a1f0b22fe6b0
=======
# Blog-list-application
Created with node, the application allows users to save information about blogs they found interesting on the internet
>>>>>>> 33f9fa48f596b4f5d32bd627821f0ab46f5fa295
