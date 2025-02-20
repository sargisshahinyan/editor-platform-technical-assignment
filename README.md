# Editor Platform's Technical Assignment

## Introduction

This is a technical assignment for Editor Platform's candidates.
The assignment is
to create a simple web application that will fetch images from the API and display them in a masonry layout.

## Live Demo

You can find the live demo of the application [here](https://editor-platform-technical-assignment.vercel.app).

## Local Development

To start the development server, you should have a docker installed on your machine.
You could install docker from [here](https://docs.docker.com/get-docker/).

After installing docker, you can run the following command to start the development server:
```bash
docker build -t editor-platform-assignment .
```
this will build the docker image for the application.
```bash
docker run -p 3000:3000 editor-platform-assignment
```
this will start the development server on port 3000.
