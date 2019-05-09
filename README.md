# Bookshelf

> Bookshelf is a clone of an item page from https://goodreads.com. It includes 4 modules: the main book information, extra details, author details, and the reviews.
> The goal of this project was to take a legacy codebase and refactor the entire back-end to handle at least 10M entries.


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development
Workflow and sprint management can be seen at: https://trello.com/b/sI4IwOWn/fec.

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### To Run
  - Run 'npm run start:dev' to start server. Nodemon should be installed on your machine.
  - Run 'npm run build:dev' to build files with Webpack and create bundle.js.
  - Run 'npm run seed-db' to seed the database.
  - Run 'npm test" to run tests.

