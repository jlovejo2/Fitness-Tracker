## Fitness-Tracker:
Create an app that allows users to add a burger to the menu and then eat it! Be careful the cooks at this restaurant might not meet FDA standards

the link to github is shown below:
https://github.com/jlovejo2/Fitness-Tracker.git

the link to the functional app is shown below:
https://mysterious-earth-27022.herokuapp.com/

## Table of Contents
* [User Story](#user-story)
* [Version 1.0](#version-1.0)
* [How To Use](#how-to-use)
* [Coding Languages Used](#coding-languages-used)
* [NPMs Used](#npms-used)
* [CSS Framework](#css-framework)
* [Structure of Code and Functions](#structure-of-code-and-functions)
* [Known Issues With Code](#known-issues-with-code)

## User Story
As a user I am in need of an app that allows me to create daily workout plans and then add and track the exercises for those workoutplans. I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled. 

## Version 1.0
* This fitness-tracker app runs via heroku or by entering the command "node server.js" to initialize the server.
* Make sure you are in the main folder when running the code on the command line.
* This app allows the user to create a daily workout and add as many exercises for that day as they have the endurance to complete.  These exercises are tracked and then the statistics for the week will then be displayed in the dashboard.  The workout summary for the last workout will also be displayed on the homepage.

## How To Use
See the layout of the app below.


- STEP 1: To begin the fitness tracker opens on a workout-summary page.  The page renders the stats of the last workout onto the page.  The user has the option of adding an exercise to current workout or creating a new workout.  If no workouts exist then the user will only have the option to create a new workout.  In the upper left hand corner of the page are two links.  
    - "Fitness Tracker" which navigates back to this workout summary page
    - "Dashboard"  which navigates to a page that displays the stats for the last week of workouts.

*![alt text](/public/assets/images/homepage.png "Starting page of App") 

- STEP 2:  When the user chooses to add an exercise or start a new workout it navigates to the page where they select their workout type.  The options currently are 'resistance' or 'cardio.'
   
*![alt text](/public/assets/images/pick-workout-type.png "Picking workout-type") 

- STEP 3: If the user chooses resistance these options are rendered.  They must all be filled in to add an exercise or complete a workout.

*![alt text](/public/assets/images/select-resistance.png "Resistance workout options") 

- STEP 4:  If the user chooses cardio these options are rendered.

*![alt text](/public/assets/images/type=cardio.png "Cardio workout options") 

- STEP 5: If the user chooses to add an exercise or complete the workout a message will render in the upper left hand corner of screen when the workout has been updated or added successfully

*![alt text](/public/assets/images/workout-succesful.png "Workout successful message") 

- When the user clicks on the dashboard link in the upper left hand corner of screen (only shown at workout summary page) they are navigated to this workout stats page.

*![alt text](/public/assets/images/dashboard.png "Example display of dashboard page") 

-
## Coding Languages Used
* HTML
* CSS
* Javascript
* Node.js
* MongoDB

## NPMs Used:
* NPM express
* NPM mongoose
* NPM morgan

## CSS Framework:
* Bootstrap

## Structure of Code and Functions
* controllers - is the folder that contains the code with main body of api routes that deal with the models
    - controller.js - this file contains all the api routes.  It was created because some manipulation of the database data into a format that better serves the front-end was done
* models - is the folder that contains the code files for the mongoose schema
    - exercises.js - this file contains the code for the exercises schema
    - index.js - this file combines our models and exports them
    - workoutPlan.js - this file contains the code for the workoutPlan schema
* public folder - contains all the code that is needed to for the browser to run the application
    - assets folder - contains all the javascript and css code
         - images - contains images for readme and website
    - css folder
        - style.css - is the actual file with most of the css code for the rendered html pages.
        - workout-style.css
    - js folder
        - api.js - places all the frontend code that does the calls to the api into functions that can be referenced by the other js files
        - exercise.js - this file runs all the front end code for functionality with the actual delivering of exercises and workouts info to database.  It deals with the submitting of this data. rendering it to the page and delivering the workout successful animation
        - index.js - this file runs at the homepage and will pull the lastworkout and place its id into the url if a workout exists
        - stats.js - this file contains all the front end code for the dashboard page.
        -workoutjs - this file contains all the front end code for the rendering of information into the workout summary 
    - exercise.html - this is the html code for the adding of exercises page
    - index.html - this is the html code for the homepage
    - stats.html - this is the html code for the dashboard
* seeders - this folder contains seeder files that are used to seed database for development (note: I did not set up my database in a way that works for provided seeder files)
* server.js - is the actual file that is run to create application and start server listening.



## Known Issues With Code
*  If you have more than one workoutPlan in a day then the api/workout/range is only grabbing the last 7 workouts.
*  Believe the front end code for the charts is not designed correctly.  The bar charts and line charts want to be delivered daily totals of duration and weight for all the exercises in that daily workout plan.  The pie and donut charts are designed to be delivered all the exercise names for all workouts in a day.  So these names won't line-up with the daily totals and therefore they aren't in sync.
