# base image
FROM node:erbium-alpine

WORKDIR /app

COPY ./frontend /app

RUN yarn add global @vue/cli
RUN yarn add global vue-template-compiler
RUN yarn add global vue-material
RUN yarn add global vuelidate
RUN yarn add global date-fns
RUN yarn


EXPOSE 8080

CMD ["yarn", "serve"]
