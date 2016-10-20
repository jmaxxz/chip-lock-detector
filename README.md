##How to use this project

[Flash your chip with the latest OS.](http://flash.getchip.com/) I recommend a headless version be used as it **should** boot faster.

[Connect to the chip via UART.](http://docs.getchip.com/chip.html#headless-chip)

Configure a network connection.
```bash
sudo nmcli device wifi connect '(your wifi network name/SSID)' password '(your wifi password)' ifname wlan0
```

###Install prereqs
```bash
# Install NodeJS 6.x
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Noble JS prereqs
sudo apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev

# Chip-IO Prereqs
sudo apt-get install -y build-essential
sudo adduser chip i2c
```
