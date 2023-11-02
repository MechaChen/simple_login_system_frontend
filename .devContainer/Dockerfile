# 使用官方 Node.js 映像作為基礎
FROM node:20

# 設定工作目錄
WORKDIR /usr/src/app

# 將你的項目文件複製到容器中
COPY . .

# 安裝依賴
RUN yarn install

# 開放容器的 5173 端口
EXPOSE 5173
