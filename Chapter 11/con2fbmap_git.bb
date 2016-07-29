SUMMARY = "Utility for swapping an fbtft-based device"
DESCRIPTION = "Simple utility for swapping an fbtft-based device as \
the console"
LICENSE = "CLOSED"
#LIC_FILES_CHKSUM = "file://COPYING;md5=d32239bcb673463ab874e80d47fae504"
SECTION = "console/utils"

inherit autotools

SRC_URI = "git://gitlab.com/pibox/con2fbmap.git;branch=master;protocol=https"

SRCREV = "f57bf6d28910ba665efab8a65085ba6d4c6162a5"

S = "${WORKDIR}/git"
