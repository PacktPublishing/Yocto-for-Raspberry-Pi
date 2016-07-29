# Base this image on core-image-minimal
include recipes-core/images/core-image-minimal.bb

DESCRIPTION = "Image for raspberry-pi"

IMAGE_FEATURES += "ssh-server-dropbear splash"

# Include modules in rootfs
IMAGE_INSTALL += " \
	kernel-modules \
	gpio-packt	\
	"
