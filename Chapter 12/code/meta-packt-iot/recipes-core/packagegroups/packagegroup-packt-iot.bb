DESCRIPTION = "Target packages for Qt5 SDK"
LICENSE = "MIT"

inherit packagegroup

RDEPENDS_${PN} += " \
    rpi-gpio \
    nodejs \
    gpio-packt \
    webserver-packt \
"

