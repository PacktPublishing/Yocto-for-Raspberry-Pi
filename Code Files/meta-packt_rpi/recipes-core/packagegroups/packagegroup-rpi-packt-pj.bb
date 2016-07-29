DESCRIPTION = "Raspberry-Pi Packagegroup for 'Yocto Project For Raspberry-Pi'"
AUTHOR = "Pierre-Jean TEXIER"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COREBASE}/LICENSE;md5=3f40d7994397109285ec7b81fdeb3b58"

inherit packagegroup

RDEPENDS_${PN} = "\
    	spitools 	\
	i2c-tools	\
	nunchuck 	\
	v4l-utils	\
"
