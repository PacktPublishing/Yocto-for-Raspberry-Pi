DESCRIPTION = "nunchuck i2c example"
LICENSE="GPLv2"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/GPL-2.0;md5=801f80980d171dd6425610833a22dbe6"

PR = "r0" 

SRC_URI = "file://nunchuck.c"

S = "${WORKDIR}"

do_compile() {
        ${CC} ${CFLAGS} ${LDFLAGS} ${WORKDIR}/nunchuck.c -o nunchuck_packt
}

do_install() {
        install -d ${D}${bindir}
        install -m 0755 ${S}/nunchuck_packt ${D}${bindir}
}

