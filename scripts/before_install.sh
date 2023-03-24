#!/bin/bash
sudo apt-get update
sudo apt-get install -y ruby
sudo apt-get install -y wget
wget https://aws-codedeploy-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
