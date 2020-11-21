# Dictionary
A simple dictionary app demonstrating CRUD operations developed using backend as spring boot (involving jpa and spring security) and front end in react js
# Steps to successfully run the project

1.	Create a database name worddb by command “create database worddb”
2.	Run the spring boot application (the server will start at port 9999)
3.	Once the server runs the tables will be created in database but we need to populate some entries before we can successfully run server(these steps are necessary)

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

4.	Also insert an admin user as only a admin can add words to db , admin can be added by using postman by sending post request as follows as follows

Api url: http://localhost:9999/auth/signup
Payload: 
{
	"username":"admin",
	"password":"admin",
	"email":"admin@admin.com",
	"role":["admin"]
}

5.	After this run the react app using npm start and login via admin user to access all functionalities like add,display,search, update ,delete
