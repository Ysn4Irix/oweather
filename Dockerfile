FROM --platform=arm64 node:14-alpine
ARG BASE_URL=${BASE_URL}
ENV BASE_URL=${BASE_URL}
ARG NUXT_ENV_MAPBOX_BASE_URL=${NUXT_ENV_MAPBOX_BASE_URL}
ENV NUXT_ENV_MAPBOX_BASE_URL=${NUXT_ENV_MAPBOX_BASE_URL}
ARG NUXT_ENV_OPENWEATHER_BASE_URL=${NUXT_ENV_OPENWEATHER_BASE_URL}
ENV NUXT_ENV_OPENWEATHER_BASE_URL=${NUXT_ENV_OPENWEATHER_BASE_URL}
ARG NUXT_ENV_MAPBOX_ACCESS_TOKEN=${NUXT_ENV_MAPBOX_ACCESS_TOKEN}
ENV NUXT_ENV_MAPBOX_ACCESS_TOKEN=${NUXT_ENV_MAPBOX_ACCESS_TOKEN}
ARG NUXT_ENV_OPENWEATHER_ACCESS_TOKEN=${NUXT_ENV_OPENWEATHER_ACCESS_TOKEN}
ENV NUXT_ENV_OPENWEATHER_ACCESS_TOKEN=${NUXT_ENV_OPENWEATHER_ACCESS_TOKEN}
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80
CMD ["npm", "start"]