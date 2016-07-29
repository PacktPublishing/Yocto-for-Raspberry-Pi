DESCRIPTION = "Panel to monitor rpi temperature"
LICENSE = "GPLv2"
LIC_FILES_CHKSUM = "file://${COREBASE}/meta/COPYING.GPLv2;md5=751419260aa954499f7abaabaa882bbe"

# Package Release
PR = "r0"

# Use local tarball
SRC_URI = " \
	file://server.tar.gz \
	file://server.init \
	"
	
RDEPENDS_${PN} += "bash"

# Make sure our source directory (for the build) matches the directory structure in the tarball
S = "${WORKDIR}"

do_install() {
	install -d ${D}${datadir}/server-packt
	cp -a ${S}/server ${D}${datadir}/server-packt
	
	install -d ${D}${sysconfdir}/init.d/
        install -m 0755 ${WORKDIR}/server.init ${D}${sysconfdir}/init.d/server-packt-init
}

# Package files
FILES_${PN} += "${datadir}/server-packt"

inherit update-rc.d

INITSCRIPT_NAME = "server-packt-init"
INITSCRIPT_PARAMS = "start 99 5 2 . stop 19 0 1 6 ."
