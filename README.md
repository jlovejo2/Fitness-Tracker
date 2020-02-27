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
As a user I am on a diet but want the satisfaction of eating a virtual delicuous burger that I can't eat in real life.  I will add as many burgers as I want to a list and then have the option of eating them.  I would also like it to be a little more realistic and have the ability to .... "un-eat" some burgers as well.  Preferably adding sound effects would make this even more realistic.

## Version 1.0
* This burger town app runs via heroku or by entering the command "node server.js."
* Make sure you are in the main folder when running the code on the command line.
* This app allows the user to add as many burgers as they want to a list on the left hand side of screen.  If they so choose they can eat those burgers and even "un-eat" the burgers.  If user even desires they can attempt to eat an "un-eaten" burger

## How To Use
See the layout of the app below.


- STEP 1: To begin one types in a burger into text area and clicks "Add burger" button.  This is shown in image above

*![alt text](/public/assets/images/step1.png "Starting page of App") 

- STEP 2:  When add burger is cliked the burger gets added to left side of screen and a button renders with it to "EAT IT"
   
*![alt text](/public/assets/images/step2.png "Starting page of App") 

- STEP 3: clicking on the eat it button will sent it to the right side of the screen and the button will change to say "I DONT FEEL SO GOOD"
   The burger will take a few seconds to switch to eaten side which was done intentionally to allow for sound effect to finish to playing

*![alt text](/public/assets/images/step3.png "Starting page of App") 

- STEP 4:  clicking on the sick button will move the burger to the bottom of the screen and change the color scheme of it
There is another less appealing sound effect to this button and once again there is a delay for burger to move to next area

*![alt text](/public/assets/images/step4.png "Starting page of App") 

- STEP 5: if user so choose they can click on the "EAT IT" button again and try to eat the un-eaten burger.  This will cause a modal to pop up which says that we wont allow user to do that and deletes the burger from the database.

*![alt text](/public/assets/images/step5.png "Starting page of App") 

 Also when user attempts to enter an empty string a modal pops up prompting them to add a burger.

*![alt text](/public/assets/images/empty_modal.png "Starting page of App") 

-
## Coding Languages Used
* HTML
* CSS
* Javascript
* Node.js
* SQL

## NPMs Used:
* NPM express
* NPM mysql
* NPM express-handlebars

## CSS Framework:
* Bootstrap

## Structure of Code and Functions
* config - is the folder that holds my generate database connection code
    connection.js - is the file that holds my user info and creates connection to database
    orm.js - This file has generic functions that receive parameters from the models to create database queries.  There are also custom functions 
    in the file that aide in the delivering of parameters to the orm sql query functions
* models
    burgers.js - this file takes the orm.js functions and customizes them for the burger table
 controllers - this where the api routes interact with the models
    burgerController.js - this contains all the api routes being used in the ajax calls and delivers those parameters to the functions in models/burgers.js
* db folder - contains the database files that store the notes information
    - schme.sql - this the schema for my database
    - seed.sql - these are my seed files used for testing
    - trigger.sql - This is the before update trigger code that Vito helped me create for my database.  In order to create it I right clicked on the table in sql workbench and went to alter table and then triggers.  The code in trigger.sql is what the alter table wizard helped us generate
* public folder - contains all the code that is needed to for the browser to run the application
    - assets folder - contains all the javascript and css code
        - audio - contains audio clips used for sound effects
        - css folder
            - style.css - is the actual file with all the code for css
        - images - contains images for readme and website
        - js folder
            - burger.js - contains all the javasript and jquery code for the front end.  So the ajax calls, click event functions, etc.
        - views
            - layouts - folder which contains the generic layout html to have other html rendered into
                - main.handlebars - contains the html that is note dynamically changed by handlebars
            - partials 
                - burger-block.handlebars - contains the dynmaic html for the buttons generated inside the index.handlebars
            - index.handlebars - contains the unordered lists and list item html that burgers are generated by
* server.js - is the actual file that is run to create application and start server listening.


## Known Issues With Code
* Because location.reload() was usued to regenerate burgers the sound effect was getting cut-off before it play.  A work around for this was putting the location.reload() in a setTimeout function to delay it from running.  This is not ideal and preferably I would rewrite code to have an init() function to initiliaze page and render the burgers so that I wouldnot be reloading the page and cut-off my sound-effect.
