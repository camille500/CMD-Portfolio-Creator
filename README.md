# CMD Portfolio Creator
This is the documentation belonging to the CMD Portfolio Creator

## Description
The CMD Portfolio Creator makes it possible for CMD students to create an portfolio without technical knowledge. The students can choose between two templates and fill in the information about them. They can add all their projects and preview it if their done. The template can be exported to an zip file with all HTML, JS, CSS and images.

## Features
* Create an account for students
* Choose between two portfolio templates
* Fill in the about information
* Add projects to the portfolio
* Preview the portfolio with their information and projects
* Export the portfolio with their information and projects
* Login on a later moment to change template, information or projects and export again

## Dependencies

* [x] [`Archiver`](https://www.npmjs.com/package/archiver) Streaming interface for archiving
* [x] [`Body-parser`](https://www.npmjs.com/package/body-parser) Middleware for body parsing
* [x] [`Dotenv`](https://www.npmjs.com/package/dotenv) Load enviroment variables from .env files
* [x] [`EJS`](https://www.npmjs.com/package/ejs) Templating library (Embedded JavaScript templates)
* [x] [`Express`](https://www.npmjs.com/package/express) Web framework for NodeJS (routing)
* [x] [`Express-session`](https://www.npmjs.com/package/express-session) Middleware for creating sessions
* [x] [`FS`](https://www.npmjs.com/package/fs) File system middleware
* [x] [`Password hash`](https://www.npmjs.com/package/password-hash) Library to simplify use of hashed passwords
* [x] [`Mongodb`](https://www.npmjs.com/package/mongoose) Official MongoDB driver
* [x] [`Multer`](https://www.npmjs.com/package/multer) Middleware for handling multipart/form-data
* [x] [`Compression`](https://www.npmjs.com/package/compression) Gzip compression

## Development dependencies
* [x] [`Gulp`](https://www.npmjs.com/package/gulp) Automation toolkit
* [x] [`Gulp Sass`](https://www.npmjs.com/package/gulp-sass) Sass plugin for Gulp
* [x] [`Nodemon`](https://www.npmjs.com/package/nodemon) For use during development

### Clone the Repository
```console
https://github.com/camille500/CMD-Portfolio-Creator.git
cd CMD-Portfolio-Creator
```

### Install all dependencies
```console
npm install
```

### Setup .env variables
Ask me for all the variables
```
SESSION_SECRET={session_secret}
MONGODB_URI={mongoDB_url}
```
