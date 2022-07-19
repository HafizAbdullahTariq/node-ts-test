# node-ts-test
## Tech Stack

| Name       | Description                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Nodejs     | Node.js is an open-source, cross-platform, back-end JavaScript runtime environment              |
| Typescript | Superset of JavaScript which primarily provides optional static typing, classes and interfaces. |
| Express    | Fast, unopinionated, minimalist web framework for node.                                         |
| MongoDB    | MongoDB is an open source cross-platform document-oriented database program.                    |
| Docker     | A tool designed to make it easier to create, deploy, and run applications by using containers.  |

<br/>

## Setup and Usages

Run this command `npm install` or `yarn install`
Unzip data file `cities_canada-usa.tsv.zip`
Run following command to import data into mongodb
`mongoimport --db suggestion_db --collection suggestions --type tsv --file cities_canada-usa.tsv --headerline`
Run this project `npm run start:dev` or `yarn run start:dev`.
Run following curl requst for data migration.
`curl --location --request GET 'http://localhost:3000/api/suggestion/migrate'`
Run following curl request to get suggestions
`curl --location --request GET 'http://localhost:3000/api/suggestion?q=Amherst&latitude=43.70011&longitude=-79.4163&radius=5&sort=distance'`

<br/>
This project provides somes scripts:

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| npm run start:dev | Running this project in development environment. |
| npm run start:dev | Running this project in production environment.  |
| npm run test:unit | Running unit testing with Jest.                  |
