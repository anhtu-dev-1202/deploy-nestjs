#!/bin/bash
apt-get update
apt-get install -y ruby
cd /home/ubuntu
curl -O https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
./install auto