**Vaccine Scheduling Application README**

summary of files and what they are:

mainLogin.js -> This is the main javascript file that uses node express to connect and to load the website up.  
	*important* it has a variable called currentUser that holds the User object of the user who logged in after someone logged in
	TODO: forgot to change currentUser to null once someone logged out. also to add functionality to the adding staff to a hospital form.

User.js -> This is the schema for the database. It contains structures used in both the mobile app and website
		
index.js -> This is the main javascript file that uses node express to connect to the mobile app.
	
app.zip -> Contains the files which fully run the Android app

/public/login.html -> This is the login page, and is the only html file (everything else is an embedded javascript template, or ejs). It doesn't do much other than hold the form that makes the call to /checkUserLogin in mainLogin.js after someone entered their login information.

/public/stylesLogin.css -> Just the stylesheet to make the login page look pretty.

/styles/stylesDashboard.css -> The stylesheet to make the dashboard pages look pretty.

/views/ -> Contains a range of ejs files that switch the pages of the website. Has both user dashboard pages and admin dashboard pages.

To run the code: 

install a mongodb on your computer like the node-setup.pdf says under project files on canvas. Create a folder for the data for your database to go

under the /bin folder of your mongodb folder (what you downloaded) type:
	./mongod --dbpath= 
	and then add the exact path to that folder for the data that you created before

Then, in a different tab on terminal or command line, navigate to the folder containing my files from git. Make sure you install node into these folders following the node-setup.pdf again. Then type
	node mainLogin.js
to run the website or
	node index.js
to start running the android app

For the website, if you then go to a browser and type 
	http://localhost:3000

The login screen should show up, but note that accounts are only intended to be created on the Android app.

For the Android app, unzip the app.zip file and open the file produced in AndroidStudio. Wait for the gradle to compile everything, and then run the program on a valid configuration. Make sure that
node index.js was run prior to running the app, as this is required in order to have access to the database.

Note there are commented out portions that can access an Atlas database. For now we aren't using this, but it can be accessed if desired.

If you have questions or problems, feel free to reach out to us. 
-Morgan, Alan, Ali 
