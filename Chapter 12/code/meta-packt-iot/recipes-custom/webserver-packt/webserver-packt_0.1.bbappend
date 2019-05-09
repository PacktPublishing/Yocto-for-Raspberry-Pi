DESCRIPTION = "Remote lighting control"

FILESEXTRAPATHS_prepend := "${THISDIR}/${PN}:"

SRC_URI += " \
    file://server.js \
    file://index.html \
    "

do_install_append() {
	install -d ${D}${datadir}/server-packt/server
    install -m 0755 ${WORKDIR}/index.html ${D}${datadir}/server-packt/server/public/index.html
    install -m 0755 ${WORKDIR}/server.js ${D}${datadir}/server-packt/server/server.js
}
