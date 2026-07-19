FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS.git .

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "HOST=0.0.0.0 npm start"]