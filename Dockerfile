FROM node:14 as build

WORKDIR /frontend
COPY . /frontend

RUN npm install

RUN --mount=type=secret,id=REACT_APP_NETWORK_URL \
    --mount=type=secret,id=REACT_APP_CHAIN_ID \
    --mount=type=secret,id=REACT_APP_GTAG \
    --mount=type=secret,id=REACT_APP_NODE_1 \
    --mount=type=secret,id=REACT_APP_NODE_2 \
    --mount=type=secret,id=REACT_APP_NODE_3 \
    export REACT_APP_NETWORK_URL=$(cat /run/secrets/REACT_APP_NETWORK_URL) && \ 
    export REACT_APP_CHAIN_ID=$(cat /run/secrets/REACT_APP_CHAIN_ID) && \
    export REACT_APP_GTAG=$(cat /run/secrets/REACT_APP_GTAG) && \ 
    export REACT_APP_NODE_1=$(cat /run/secrets/REACT_APP_NODE_1) && \
    export REACT_APP_NODE_2=$(cat /run/secrets/REACT_APP_NODE_2) && \ 
    export REACT_APP_NODE_3=$(cat /run/secrets/REACT_APP_NODE_3) && \ 
    npm run build

CMD ["npm", "start"]

FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/default.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
