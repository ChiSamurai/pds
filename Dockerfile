FROM nginx:alpine
COPY dist/pds-storybook /usr/share/nginx/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
