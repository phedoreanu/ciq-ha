#!/usr/bin/env bashio
CONFIG_PATH=/data/options.json

NAME="$(jq -r '.name' $CONFIG_PATH)"
UUID="$(jq -r '.uuid' $CONFIG_PATH)"
LOG="$(jq -r '.log' $CONFIG_PATH)"

export NAME="${NAME}"
export UUID="${UUID}"
export LOG="${LOG}"

echo "CIQ-HA started: $(date)"

#-------------------------------------------------
# Base Characteristics
#-------------------------------------------------
# use this to run with a basic set of characteristics -
# available memory, uptime, load average and a simple
# read/write one.
#
# associated files are in characteristic/base
#
# it's the one to start with to check basic functionality
# run:

node ciq-base.js
