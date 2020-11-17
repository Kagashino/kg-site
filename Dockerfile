FROM nginx:alpine

COPY build/ /app

COPY config/spa.conf /etc/nginx/conf.d/spa.conf

CMD ["nginx", "-g", "daemon off;"]
