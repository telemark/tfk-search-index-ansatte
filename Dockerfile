# Setting the base to nodejs 8.8.0
FROM node:8.8.0-alpine

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV JWT_KEY "Louie Louie, oh no, I got to go"
ENV SEARCH_SERVICE_URL https://search.service.com/api
ENV SEARCH_SERVICE_INDEX www
ENV SEARCH_SERVICE_INDEX_TYPE article
ENV SOURCE_URL "http://www.yoursite.com/api/employees.json"
ENV SITE_URL "http://www.yoursite.com/employees"

# Startup
ENTRYPOINT node index