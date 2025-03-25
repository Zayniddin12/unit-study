FROM registry.uicgroup.tech/a.xamroyev/unit-study:nodemodules AS modules

FROM node:18.20-alpine3.19 as build

WORKDIR /app 

COPY . . 

COPY --from=modules /app/node_modules /app/node_modules 

RUN yarn build 

FROM node:18.20-alpine3.19 as prod

RUN npm install pm2 -g

WORKDIR /app 

COPY --from=build /app/.output /app/.output

COPY --from=build /app/ecosystem.config.js /app/ecosystem.config.js

CMD ["pm2-runtime", "start", "ecosystem.config.js"]


