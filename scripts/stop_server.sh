app_name="deploy-nestjs"
pm2_pid=$(pm2 list | grep $app_name | awk '{print $4}')

if [ -n "$pm2_pid" ]; then
    pm2 stop deploy-nestjs
fi