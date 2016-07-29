# Base this raspberry-packt-image
require raspberry-packt-image.bb

DESCRIPTION = "Image for raspberry-pi packagegroup-rpi-packt-pj"

IMAGE_INSTALL_append = " packagegroup-rpi-packt-pj"
