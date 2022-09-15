# MongoDB-Social-Media-API

## Description
This application is the backend for a social media app. It uses MongoDB as the database with Mongoose as it's ODM. This application is based around Users and Thoughts. 

There is a GET route that returns all Users, and also a GET route that returns a single user based on a userId. There is also a POST route to add a user, a PUT route to update a user based on a userId, and a DELETE route to delete a user based on a userId.

There is a GET route that returns all thoughts, and a GET route that returns a single thought based on thoughtId. There is also a POST route to add a thought, a PUT route to update a thought based on thoughtId, and a DELETE route to delete a thought based on thoughtId.

There is also a POST route that can add a friend to the friends property of each user, as well as a DELETE route that can delete a friend from this friends property.

There is also a POST route that can add a reaction to the reactions property of each thought, as well as a DELETE route that can delete a reaction from this reactions property.

## Link to Walkthrough Video
https://screenrec.com/share/EjBcMkYwsN
