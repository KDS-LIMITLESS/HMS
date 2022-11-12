#!/bin/bash
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.386
mv cloud_sql_proxy.linux.386 cloud_sql_proxy
chmod +x cloud_sql_proxy
./cloud_sql_proxy -instances=34.28.1.110=tcp:3306 -credential_file=./synthetic-trail-368311-3817ed4addc5.json