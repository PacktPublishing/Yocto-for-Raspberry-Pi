/*
 * nunchuck.c
 *
 * Copyright (C) 2015 - packt publishing <texier.pj2@gmail.com>
 *
 * <nunchuck> is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * <nunchuck> is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with <nunchuck>. If not, see <http://www.gnu.org/licenses/>.
 */


#include <stdio.h>
#include <stdlib.h>
#include <linux/i2c-dev.h>
#include <fcntl.h>
#include <string.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <signal.h>

#define I2C_DEV "/dev/i2c-0"
#define WII_NUNCHUCK_ADDRESS 0x52
#define MASK_BUTTON_Z 0x01
#define MASK_BUTTON_C 0x02
#define MASK_ACCEL_X 0x0C
#define MASK_ACCEL_Y 0x30
#define MASK_ACCEL_Z 0xC0
#define BUTTON_Z(a) (a & MASK_BUTTON_Z)
#define BUTTON_C(a) ((a & MASK_BUTTON_C) >> 1)
#define ACCEL_X(a, b) ((a << 2) | ((b & MASK_ACCEL_X) >> 2))
#define ACCEL_Y(a, b) ((a << 2) | ((b & MASK_ACCEL_X) >> 4))
#define ACCEL_Z(a, b) ((a << 2) | ((b & MASK_ACCEL_X) >> 6))

int fd = 0;
static const char clear_screen[] = {0x1b, '[', 'H',
                                    0x1b, '[', 'J',
                                    0x0};
                                    
void sigintHandler(int sigNum) 
{
        if (fd > 0) {
                close(fd);
        }

        psignal(sigNum, "");	/* to print signal */

        exit(0);
}

int init_nunchuck(void) 
{
        char buf[2];

        if ((fd = open(I2C_DEV, O_RDWR)) < 0) {
                return (-1);
        }

        if (ioctl(fd, I2C_SLAVE, WII_NUNCHUCK_ADDRESS) < 0) 
        {
        	fprintf(stderr,"Error setting i2c address %x\n",WII_NUNCHUCK_ADDRESS);
                close(fd);
                return -1;
        }

        buf[0] = 0xF0;
        buf[1] = 0x55;

        if (write(fd, buf, 2) < 0) 
        {
        	fprintf(stderr,"Error starting nunchuck!\n");
                close(fd);
                return -1;
        }

        buf[0] = 0xFB;
        buf[1] = 0x00;

        if (write(fd, buf, 2) < 0) 
        {
        	fprintf(stderr,"Error starting nunchuck!\n");
                close(fd);
                return -1;
        }

        return 0;
}

int read_id(char *buf) 
{
        buf[0] = 0xFA;

        if (write(fd, buf, 1) < 0) {
                perror("write");
                close(fd);
                exit(1);
        }

        if (read(fd, buf, 6) < 0) {
                perror("read");
                close(fd);
                exit(1);
        }
}

int send_request(void) 
{
        char buf[1];

        buf[0] = 0x00;

        if (write(fd, buf, 1) < 0) 
        {
        	printf("Error writing \n");
                close(fd);
                return (-1);
        }
}

int read_data(char *buf) 
{
        if (read(fd, buf, 6) < 0) 
        {
        	printf("Error reading \n");
                return -1;
        }

        send_request();

        return (0);
}

int main(int argc, char *argv[]) 
{
        char buf[6] = {0, 0, 0, 0, 0, 0};
        int accelX;
        int accelY;
        int accelZ;
        int buttonC;
        int buttonZ;

        signal(SIGINT, sigintHandler);
        signal(SIGTERM, sigintHandler);

        /*if (init_nunchuck() < 0) {
                perror("init_nunchuck");
                exit(1);
        }*/


        while (1) 
        {
        	printf("%s", clear_screen);
        	printf("\t\t\t\t== Nunchuck rpi ==\n");	
        	
                if (read_data(buf) < 0) {
                        perror("read_data");
                        close(fd);
                        exit(1);
                }

                printf("X : %d / Y : %d\n", buf[0], buf[1]);	/* buf[0] = X ; buf[1] = Y */ 

                accelX = ACCEL_X(buf[2], buf[5]);		/* buf[2] << 2) | ((buf[5] & 0x0C) >> 2 */
                accelY = ACCEL_Y(buf[3], buf[5]);		/* buf[3] << 2) | ((buf[5] & 0x30) >> 4 */
                accelZ = ACCEL_Z(buf[4], buf[5]);		/* buf[4] << 2) | ((buf[5] & 0xC0) >> 6 */

                printf("AX:%d\n", accelX);
                printf("AY:%d\n", accelY);
                printf("AZ:%d\n", accelZ);

                buttonZ = BUTTON_Z(buf[5]);			/* (buf[5] & 0x01) */
                buttonC = BUTTON_C(buf[5]);			/* (buf[5] & 0x02) >> 1 */

                printf ("%s/%s", (buttonZ ? "z" : "Z"), (buttonC ? "c" : "Z"));

                printf("\n");

                usleep(1000 * 1000);
        }
}


