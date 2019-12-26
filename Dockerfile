FROM node:10-alpine
ADD ./ /code

RUN cd /code \
    && npm run start \
EXPOSE 3000
