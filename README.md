# iReporter

[![Build Status](https://travis-ci.com/haywhyze/iReporter.svg?branch=develop)](https://travis-ci.com/haywhyze/iReporter) [![Coverage Status](https://coveralls.io/repos/github/haywhyze/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/haywhyze/iReporter?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/64ea93f642a18de72626/maintainability)](https://codeclimate.com/github/haywhyze/iReporter/maintainability)
---
iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

### Implemented Features

- Users can create a red-flag record.
- Users can fetch all red-flag red-flag records.
- Users can fetch one red-flag record.
- Users can update a specific red-flag's location.
- Users can update a specific red-flag's comment.
- Users can delete a specific red-lag.

---

### Prerequisites

[NodeJS](https://nodejs.org/) (>8.11.3) and [NPM](https://www.npmjs.com/) (>5.6.0) are required to run this application.

---

### Installation

- Clone this repository and navigate into it.

`git clone https://github.com/haywhyze/iReporter.git && cd iReporter`

- Install dependencies.

`npm install`

- Start the application. 

`npm run start`

---

### Documentation

This application is deployed on [heroku](https://ireporter-andela.herokuapp.com/) with the following endpoints accessible 
|Method|Functionality|Endpoint |
|--|--|--|
|GET */red-flags*  |Get all red-flags  |`api/v1/red-flags`  |
|GET */red-flags/\<red-flag-id\>* | Get a specific red-flag id| `api/v1/red-flags/:id`
|POST */red-flags/* | create a specific red-flag| `api/v1/red-flags/`
|PATCH */red-flags/\<red-flag-id\>/location* | Change the location of a specific red-flag id| `api/v1/red-flags/:id/location`
|PATCH */red-flags/\<red-flag-id\>/comment* | Change the comment of a specific red-flag id| `api/v1/red-flags/:id/comment`
|DELETE */red-flags/\<red-flag-id\>* | Delete a specific red-flag id| `api/v1/red-flags/:id/`

#### Required Parameters

##### POST */red-flags*

```JSON
{
  "subject":  "[Subject of the red-flag/intervention incidet]"(optional),
  "type":  "[red-flag/intervention]",
  "location":  "[Valid latLng coordinates e.g '(6.593404442689329, 3.364960622142803)' with or without the brackets]",
  "comment":  "details of the red-flag/intervention incident not less than 50 characters nor more than 420 characters"
}
```

#### PATCH */red-flags/\<red-flag-id\>/location*

```JSON
{
  "location":  "[Valid latLng coordinates e.g '(6.593404442689329, 3.364960622142803)' with or without the brackets]"
}
```

#### PATCH */red-flags/\<red-flag-id\>/comment*

```JSON
{
  "comment":  "details of the red-flag/intervention incident not less than 50 characters nor more than 420 characters"
}
```

---

### Testing the Application Locally

If the project has been cloned and navigated into as specified [above](#installation), you can run tests...

#### Using POSTMAN 

If you do not have POSTMAN installed, download [here](https://www.getpostman.com/)

- In the terminal start the application with  `npm run start`

- On POSTMAN navigate to `localhost:3000/` and use the documentation [above](#documentation) as guide to access the endpoints.

#### Using MOCHA

If you do not have mocha installed, you can install using npm with:
`npm -i mocha -g`
then you can run tests with:  
`npm run test`

---

### Technologies Used

- [NodeJS](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Babel](https://babeljs.io/)

- [ESLint](https://eslint.org/)

- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)

---

### Acknowledgements

[Chukwuemeka](https://twitter.com/3m3kalionel)
[Andela](https://andela.com/)

---

### Author

[Yusuf Ayo Abdulkarim](https://twitter.com/haywhyze)