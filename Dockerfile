FROM node:10-alpine
ADD ./ /code

RUN cd /code \
    && npm install \
    && npm run build \
    && mv config/nginx.conf /etc/nginx/nginx.conf \
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
