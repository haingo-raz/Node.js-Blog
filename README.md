# Table of Contents
- [About](#about)
- [Technology](#technology)
- [How to run it on your computer?](#run)
- [UI](#ui)

# About <a name="about"></a>
A blog developed with Node.js whereby users can register, login, create a post and update their details.

# Technology <a name="technology"></a>
- HTML/CSS
- Vanilla JS
- NodeJS ( Express ) 
- MySQL

# How to run it on your computer? <a name="run"></a>

## Prequequisites 
- Install XAMPP or a similar tool to be able to run MySQL.
- Install HeidiSQL, a graphical interface to manage MySQL databases or a similar tool.
- Install Node.js, which includes npm.

## Setting up the database 
- Open XAMPP and start the MySQL module.
- Open HeidiSQL and connect to the MySQL server by entering your chosen host, username, and password. In this project the default username 'host' is used and the password is empty.
- Create a new database. I named mine "Coursework3" in this project.
- Browse to the project folder and go to database_dump folder, and import posts.sql and users.sql in the created database to populate the database with dummy data.

## Run the server 
- Open a terminal or command prompt and navigate to the project folder.
- Run `npm install` to install project dependencies.
- Run `node server.js` to start the server.
- Open a web browser and go to http://localhost:8080 (or your chosen port) to see the running application.

# UI <a name="ui"></a>
### Homepage
![Node.js blog](https://raw.githubusercontent.com/haingo-raz/Node.js-blog/main/UI/Blog.png)

### Post creation
![Create-post](https://raw.githubusercontent.com/haingo-raz/Node.js-blog/main/UI/Create-post.png)

### Posts created
![Posts](https://raw.githubusercontent.com/haingo-raz/Node.js-blog/main/UI/Posts.png)

### Profile page
![Profile](https://raw.githubusercontent.com/haingo-raz/Node.js-blog/main/UI/Profile.png)

# Future work
- Allow users to add a profile picture.
- Allow users to edit their pasts posts.
- Allow users to delete their pasts posts.
- Allow users to upvote and downvote a post recommendation.
- Allow users to direct message another user.
- Allow users to update their email or password, upong providing their current password.
