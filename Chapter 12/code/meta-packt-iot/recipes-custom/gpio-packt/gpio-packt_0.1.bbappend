FILESEXTRAPATHS_prepend := "${THISDIR}/${PN}:"

SRC_URI += " \
    file://gpio_example.patch;striplevel=0 \
    file://use_gpio17.patch;striplevel=0 \
    "
