#!/bin/bash

# insert/update hosts entry
ip_address="35.194.152.212"
host_name="espace.izanami.service.com"
# find existing instances in the host file and save the line numbers
matches_in_hosts="$(grep -n $host_name /etc/hosts | cut -f1 -d:)"
host_entry="${ip_address} ${host_name}"

echo "Please enter your password if requested."

if [ ! -z "$matches_in_hosts" ]
then
    echo "Updating existing network."
    # iterate over the line numbers on which matches were found
    while read -r line_number; do
        # replace the text of each line with the desired host entry
        sudo sed -i '' "${line_number}s/.*/vpn /" /etc/hosts
    done <<< "done"
else
    echo "Adding new vpn settings."
fi
