#!/bin/bash
sudo apt-get install -y ruby
sudo apt-get install -y wget
cd /home/ubuntu
wget https://aws-codedeploy-ap-southeast-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start

