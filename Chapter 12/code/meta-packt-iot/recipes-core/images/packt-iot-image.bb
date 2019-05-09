# Base this image on rpi-basic-image
include recipes-core/images/rpi-basic-image.bb

SPLASH = "psplash-raspberrypi"

IMAGE_FEATURES += "ssh-server-dropbear splash"
IMAGE_INSTALL_append = " packagegroup-packt-iot"

ROOTFS_POSTPROCESS_COMMAND += " create_release_file ; "

create_release_file() {
    #!/bin/sh -x
    IMAGE_REL_FILE="${IMAGE_ROOTFS}${sysconfdir}/packt-iot-release"
    echo "packt-iot release version 1.0" > ${IMAGE_REL_FILE}
    echo "Image: ${IMAGE_NAME}" >> ${IMAGE_REL_FILE}
    echo "Build date: ${DATETIME}" >> ${IMAGE_REL_FILE}

    chmod 0444 ${IMAGE_REL_FILE}
}
