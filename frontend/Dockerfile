# FROM node:16.14-alpine
# WORKDIR /app-frontend
#  ...
FROM node:14-alpine

# RUN command

EXPOSE 3000

WORKDIR /app-frontend

# ADD node_modules.tar.gz .

COPY . .

RUN [ "npm", "install" ]

CMD [ "npm", "start" ]
