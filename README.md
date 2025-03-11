# Paint Collection

## Table of Contents

- [Paint Collection](#paint-collection)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Quick Start Guide](#quick-start-guide)
  - [Local Development](#local-development)
    - [Icons](#icons)
    - [API Backend](#api-backend)
  - [Deployment](#deployment)
    - [Manual deployment](#manual-deployment)
  - [Production](#production)

## Overview

Paint Collection is a web application that allows users to manage and explore a collection of paints. Users can add, edit, and delete paint entries, as well as view detailed information about each paint.

## Features

- Add, edit, and delete paint entries
- User authentication and authorization
- Responsive design

## Quick Start Guide

To install and run this app, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/paint-collection.git
    cd paint-collection
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Start the development server:
    ```sh
    pnpm dev
    ```

4. Open your browser and navigate to `http://localhost:3000`

## Local Development

### Icons

This app uses @kalimah/vue-icons to add icons. you can find more icons 
[here](https://vue-icons.kalimah-apps.com/search-icons.html)

### API Backend

The documentation for the backend API can be found [here](https://paint-api-v2.fly.dev/docs). 
If you want to contribute to this api, you can find the github project [here](https://github.com/Xillians/paint-api-v2)

## Deployment

This application is deployed via GitHub Actions to Fly.io. The deployment pipeline is defined in the .github/workflows directory.

### Manual deployment

In order to deploy to fly.io manually, you need to use the [fly cli](https://fly.io/docs/flyctl/).
After logging in, if you have access to the project, you can run this command.

```sh
fly deploy
```

This will run the dockerfile to build and deploy the application.

## Production
The application's production environment can be found at [this URL](https://paint-collection.fly.dev/).
