FROM nginx
COPY nginx/nginx.conf /etc/nginx
COPY nginx/start.sh /bin/start.sh
ADD ./build /data/www
ENV SERVICENAME="cdz-swap"
ENTRYPOINT ["sh", "/bin/start.sh"]
