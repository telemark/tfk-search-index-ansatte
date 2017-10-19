[![Build Status](https://travis-ci.org/telemark/tfk-search-index-ansatte.svg?branch=master)](https://travis-ci.org/telemark/tfk-search-index-ansatte)
[![Coverage Status](https://coveralls.io/repos/telemark/tfk-search-index-ansatte/badge.svg?branch=master&service=github)](https://coveralls.io/github/telemark/tfk-search-index-ansatte?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-search-index-ansatte.svg)](https://greenkeeper.io/)

# tfk-search-index-ansatte

Behandling av ansattdata og dytting til søkeservicen vår

## Docker

To run this module as a service use the docker image.

Change the ENV parts of the [Dockerfile](Dockerfile) or use [docker.env](docker.env)

Build
```sh
$ docker build -t tfk-search-index-ansatte .
```

or use the prebuilt image from [hub.docker.com](https://hub.docker.com/r/telemark/tfk-search-index-ansatte/)

```sh
$ docker pull telemark/tfk-search-index-ansatte
```

Run a container

```sh
$ docker run --rm tfk-search-index-ansatte
```

or

```sh
$ docker run --env-file=docker.env --rm tfk-search-index-ansatte
```

This will spin up a container. Do the job. Shut it down and remove it.

## License

[MIT](LICENSE)

![Robohash image of tfk-search-index-ansatte](https://robots.kebabstudios.party/tfk-search-index-ansatte.png "Robohash image of tfk-search-index-ansatte")