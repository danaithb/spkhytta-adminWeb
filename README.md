# Admin Dashboard for Cabin Booking 
spkhytta-adminWeb is a web-based React applictaion  deisigned to manage company cabin bookings. This admin interface allows administrators to oversee and manage cabin bookings, as well as view and process user data. Tha app intergrates with Nager.Date for holiday awareness. 

1. Requirements:
- Node.js (recommended versions: 16.0 or later)
- npm or Yarn
- Internet Connection (for API calls)

2. Setup Instructions:
- Clone the Repository
- Install denpendencies using:
* npm install
* yarn install

3. Start development server:
* npm start OR
* yarn start
- this will run the app on http://localhost:3000.

4. Available Scripts
In the project directory, you can run the following commands:

* npm start:
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

* npm test:
Launches the test runner in interactive watch mode.
Check out the section about running tests for more information.

* npm run build: 
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified, and the filenames include hashes.
Your app is ready to be deployed!

See the section about deployment for more details.

* npm run eject
Note: This is a one-way operation. Once you eject, you can't go back!
If you're not satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and dependencies (Webpack, Babel, ESLint, etc.) into your project so you have full control over them.

5. Enviroment Configuration: 
Create a .env file in the root directory of the project to store your enviroment-specific variables. 
Note: Make sure to set up your API keys and URLs in the .env file to ensure everything works correctly.

Troubleshooting: 
API data not loading?
Verify that the API endpoint is correct and that you have a valid internet connection. Check your .env file for proper API key configurations.

Missing configuration?
Ensure that your .env file is correctly set up and that the required environment variables are added.

UI Issues?
Try clearing your browser cache and refreshing the page. Alternatively, stop and restart the development server.

6. Dependencies
React: Frontend library for building the UI.

Axios: For making HTTP requests to the backend API.

React Router: For handling routing between pages.

Nager.Date API: For holiday data integration.

