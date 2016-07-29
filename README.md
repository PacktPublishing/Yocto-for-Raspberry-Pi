# Yocto-for-Raspberry-Pi

This is the code repository for [Yocto for Raspberry Pi](https://www.packtpub.com/hardware-and-creative/internet-things-python?utm_source=GitHub&utm_medium=Repository&utm_campaign=9781785881381
), published by Packt. It contains all the supporting project files necessary to work through the book from start to finish.

##Instructions and Navigation

The code included with this book is meant for use as an aid in performing the exercises and should not be used as a replacement for the book itself.
Used out of context, the code may result in an unusable configuration and no warranty is given.

The code will look like the following:
```
# LAYER_CONF_VERSION is increased each time build/conf/bblayers.conf
# changes incompatibly
LCONF_VERSION = "6" BBPATH = "${TOPDIR}" BBFILES ?= "" BBLAYERS ?= " \
/home/packt/RASPBERRYPI/poky/meta \
/home/packt/RASPBERRYPI/poky/meta-yocto \
/home/packt/RASPBERRYPI/poky/meta-yocto-bsp \
"BBLAYERS_NON_REMOVABLE ?= " \
/home/packt/RASPBERRYPI/poky/meta \
/home/packt/RASPBERRYPI/poky/meta-yocto \

```


##Related Yocto for Raspberry Pi Products:

* [Learning Raspberry Pi](https://www.packtpub.com/hardware-and-creative/learning-raspberry-pi?utm_source=GitHub&utm_medium=Repo&utm_campaign=9781783982820)
* [Raspberry Pi for Secret Agents](https://www.packtpub.com/hardware-and-creative/raspberry-pi-secret-agents?utm_source=GitHub&utm_medium=Repo&utm_campaign=9781849695787)
* [Raspberry Pi Cookbook for Python Programmers](https://www.packtpub.com/hardware-and-creative/raspberry-pi-cookbook-python-programmers?utm_source=GitHub&utm_medium=Repo&utm_campaign=9781849696623)
