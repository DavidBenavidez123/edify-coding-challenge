Welcome to my coding challenge ! 


Running the project
- To start the app make sure you have Yarn installed as that is the package manager I used to install all of my dependencies.
- First cd into the front-end directory and run 'yarn install' to Install all the dependencies.
- Afer the dependencies have been installed you can either run 'yarn start' to start up the front end client or 'yarn test all' to run all tests in the test folder

Details
- I'm using 2 public api's from https://dummyapi.io/ but there is a call limit of 500 calls a day.
- One api is to render an array of posts and the other api is to render an array of comments for any specific post.
- The network delay function will re-run the function that hits the posts api when toggeled and will then simulate the delay.
- Used Jest for unit testing and for Mocked requests for the API.
- Filtering is done on page so it will work on both the posts and the favorited posts that are stored in local storage.
- The tags on each post are also clickable and will filter.
- Clicking add the favorites will store in local storage and clicking delete favorited will remove it
