# syntax=docker/dockerfile:1
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

# Define variáveis de ambiente (pode ser sobrescrito em tempo de execução)
ENV API_GATEWAY_URL=${API_GATEWAY_URL}
ENV SMTP_SWAGGER_URL=${SMTP_SWAGGER_URL}

CMD ["npm", "test"]
