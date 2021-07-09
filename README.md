<!-- logo -->
<!-- <p align="center">
  <img width="300" src="logo.png">
</p> -->

<!-- short description -->
<h1 align="center">KitchenFarmr</h1>

<p align="center">
    <!-- license -->
    <img src="https://img.shields.io/github/license/KitchenFarmr/KitchenFarmr" />
    <!-- code size  -->
    <img src="https://img.shields.io/github/languages/code-size/KitchenFarmr/KitchenFarmr" />
    <!-- issues -->
    <img src="https://img.shields.io/github/issues/KitchenFarmr/KitchenFarmr" />
    <!-- pull requests -->
    <img src="https://img.shields.io/github/issues-pr/KitchenFarmr/KitchenFarmr" />
    <!-- number of commits per year -->
    <img src="https://img.shields.io/github/commit-activity/y/KitchenFarmr/KitchenFarmr" />
    <!-- last commit -->
    <img src="https://img.shields.io/github/last-commit/KitchenFarmr/KitchenFarmr" />
    <!-- docker image size -->
    <img src="https://img.shields.io/docker/image-size/starlightromero/KitchenFarmr" />
    <!-- docker pulls -->
    <img src="https://img.shields.io/docker/pulls/starlightromero/KitchenFarmr" />
    <!-- website status -->
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fkitchenfarmr.tk" />
</p>


## Table of Contents

- [Make Commands](#make-commands)
- [Required Software](#required-software)
- [How to Run](#how-to-run)
- [How to Contribute](#how-to-contribute)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)


## Makefile Commands

`stop`: Stop the running server

`rm`: Remove all unused containers

`rm-all`: Stop and remove all containers

`rmi`: Remove stockstalker images without removing base images. Useful for speeding up build time when switching from one start script to another such as `make start` to `make test`

`rmi-all`: Remove all images

`purge`: _Use with caution_ Completely purge Docker containers, networks, images, volumes, and cache

`lint`: Run eslint

`build`: Build development server without running the server

`start`: Start development server at port `5000`

`reload`: Stop development server and restart the server at port `5000`

`hard-reload`: Stop container, remove container, rebuild container, and start development server

`debug`: Start development server in debug mode

`test`: Start test server

`reload-test`: Reload test server

`hard-reload-test`: Stop container, remove container, rebuild container, and start test server


## Required Software

- [Docker](https://docs.docker.com/get-docker/)
- [docker-comopse](https://docs.docker.com/compose/install/)
- [CMake](https://cmake.org/install/)


## How to Run

Clone the repo
```zsh
git clone git@github.com:KitchenFarmr/KitchenFarmr.git
```

cd into the directory
```zsh
cd KitchenFarmr
```

Rename `.env.sample` to `.env`
```zsh
mv .env.sample .env
```

Edit the `.env` file to contain your environment variables
```zsh
vim .env
```

Run the application!
```zsh
make start
```

To stop the app press `CNTRL + C`. Then run:
```zsh
make stop
```

## How to Contribute

### Branches

`Production` should never be directly modified. Please make a new branch for every feature/bugfix. The branch naming should follow the protcol:

```
feature/name-of-new-feature
```

```
bugfix/short-description-of-bugfix
```

Example:

```
feature/create-home-route
```

### Commits

#### Title

Commit titles should follow the following syntax:

```zsh
"[command] name-of-file"
```

Where command is one of:
- create
- update
- delete
- lint

#### Body

The body should describe what actually happened. It should be written in the present tense.

Example:

```zsh
"Create homepage route located at path / to return, Hello World"
```

#### Commit

Below are some examples of full commits:

```zsh
git commit -m "[create] homepage route" -m "Create homepage route located at path / to return, Hello World"
```

```zsh
git commit -m "[delete] test.js" -m "Broke up test.js into testAuth.js and testCheckout.js"
```

### Pull Requests

Upon completing the feature/bugfix of the corresponding branch create a pull request with a title and description. Add at least one code reviewer to the pull request to ensure good code quality and practice. Once the code has been approved by both the reviewer and the test pipeline. The code will be merged into production.

## API Documentation


## Running Tests

To run tests simple run:
```zsh
make test
```

If any of the tests fail or if the tests do not have at least 90% coverage the command will exit with a status code of `1`.