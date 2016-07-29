DESCRIPTION = "gpio example"
LICENSE="GPLv2"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/GPL-2.0;md5=801f80980d171dd6425610833a22dbe6"

PR = "r0" 

SRC_URI += "file://gpio_example.c \
	   file://fix.patch      \
	  "

S = "${WORKDIR}"

do_compile() {
        ${CC} ${CFLAGS} ${LDFLAGS} ${WORKDIR}/gpio_example.c -o gpio_example
}

do_install() {
        install -d ${D}${bindir}
        install -m 0755 ${S}/gpio_example ${D}${bindir}
}
