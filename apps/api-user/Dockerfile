FROM node:alpine As development

WORKDIR /usr/src/app

# Add the following lines to install Python
RUN apk add --update python3 make gcc g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --upgrade pip setuptools

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm install -g nx

COPY . .

RUN nx build api-user --prod

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/api-user/main"]
