#!/bin/bash
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.386
mv cloud_sql_proxy.linux.386 cloud_sql_proxy
chmod +x cloud_sql_proxy
./cloud_sql_proxy -instances=synthetic-trail-368311:us-central1:uppist-2022-instance=tcp:3306 -credential_file=./synthetic-trail-368311-3817ed4addc5.json