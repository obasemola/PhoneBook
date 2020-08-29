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
