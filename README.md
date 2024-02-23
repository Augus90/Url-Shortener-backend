
# Shorten URL

Shorten long URLs for easier sharing or use it to save your favorite pages


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

// Config

`PORT`

`CORS`

// MONGO

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`

`DB_NAME`

## Installation

Install Shorten-URL Backend with npm

```bash
  cd Url-Shortener
  npm i -y
  npm run dev
```

## Deployment with Docker

To deploy this project whit Docker, first install [Docker](https://www.docker.com/get-started/)

- First create the image:

```bash
    docker build -t shorten-url .
```

- Later deploy the container:

```bash
    docker run -p 5000:5000 --name shorten-url-back shorten-url 
```

