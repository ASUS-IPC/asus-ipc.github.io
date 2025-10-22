---
sidebar_position: 3
---

# IMX8P-IM-A

## 1. Yocto 2.5

### 1.1 Flash image
* Please refer to PE100A

### 1.2 Build image SOP
* Please refer to PE100A

## 2. Yocto 3.2

### 2.1 Flash image


### 2.2 Build image SOP
* **ASUS IMX8P-IM-A - Yocto 3.2 BSP build SOP**

1. **Create an Ubuntu machine environment**

    Using one of the following versions is recommended: 20.04

2. **Download Yocto source code from github** (https://github.com/ASUS-IPC/manifest)

    ````
    $ git config --global user.name "Your Name"
    $ git config --global user.email "Your Email"
    ````
    
    ````
    $ mkdir ~/bin (this step may not be needed if the bin folder already exists)
    ````
    ````
    $ curl https://commondatastorage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
    $ chmod a+x ~/bin/repo
    $ export PATH=~/bin:$PATH
    $ mkdir ~/asus-yocto-3.2
    $ cd ~/asus-yocto-3.2
    ````
    ````
    $ repo init -u https://github.com/ASUS-IPC/manifest.git -m $manifest_name
    ````
    Ex. for _asus-imx8p-im-a-5.10.9-2.0.14.xml_
    ````
    $ repo init -u https://github.com/ASUS-IPC/manifest.git -m asus-imx8p-im-a-5.10.9-2.0.14.xml
    $ repo sync -j4
    ````
3. **Setup Docker**

    * **Uninstall old versions**

        ```
        $ sudo apt-get remove docker docker-engine docker.io containerd runc
        ```
    * **Install Docker Engine - Community** 

        ```
        $ sudo apt-get update
        $ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
        $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        $ sudo apt-key fingerprint 0EBFCD88
        $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        $ sudo apt-get update
        $ sudo apt-get install docker-ce docker-ce-cli containerd.io
        $ sudo docker run hello-world
        ```
        https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/

    * **Manage Docker as a non-root user** 

        If you don’t want to preface the docker command with sudo, create a Unix group called docker and add users to it.

        ```
        $ sudo groupadd docker
        $ sudo usermod -aG docker $USER
        $ sudo reboot
          
        $ docker run hello-world
        ```
        https://docs.docker.com/install/linux/linux-postinstall/

4. **Docker build:**

    * Go to to the directory where the downloaded the code base is located in, and execute the script. This will take a while as it installs the necessary packages on the host and builds the Docker image.

        ```
        $ cd ~/asus-yocto-3.2
        $ ./docker_builder/docker-builder-run.sh
        ```
    * Once the step above is finished, you are in the shell of the newly started Docker container. You can issue the following command to build all the images for yocto. Below was sample command for ASUS IMX8P-IM-A.
       
        ```
        $ DISTRO=fsl-imx-xwayland MACHINE=imx8mq-im-a EULA=1 source imx-setup-release.sh -b build_imx8mq-im-a
        $ bitbake imx-image-full
        ```

5. **After build successfully, you can find all image at below path**

    Bootloader Image:

    ```
    $ build_imx8mq-im-a/tmp/deploy/images/imx8mq-im-a/imx-boot-imx8mq-im-a-4G.bin-flash_evk
    ```
    Full Raw Image:

    ```
    $ build_imx8mq-im-a/tmp/deploy/images/imx8mq-im-a/imx-image-full-imx8mq-im-a.wic.bz2
    ```

## 3. Debian 10

### 3.1 On the IMX8P board - Set up for console debug

* **Connect IMX8P to PC with a USB serial cable**
![33333333](https://github.com/user-attachments/assets/6507bb64-b943-4cda-917d-98cc0e013195)

### 3.2 Software setting on the IMX8P board - IMX8P-config
   
   1. Type ”IMX8P-config” in terminal to enter IMX8P Software configuration Tool

      ![11](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/7e863e76-eb7c-4542-bc15-8086b900b270)

   2. Select item 3: Serial

      ![11](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/b9f37e3b-46ca-4ca3-a61e-128ff9a40b2a)

   3. Select “Yes”

      ![11](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/67b37cbc-2326-4dde-8613-0d623beea0b2)

   4. Select “OK”

      ![11](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/64a510bd-8b3c-4362-bcb0-095a52aa48e1)

   5. Select "Yes" to reboot the system

      ![12](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/9c1a6d21-b7b7-4334-8643-9dacc68bfac0)

   6. Open Putty and select Serial on the PC, and the Serial line can be checked from Windows >Device Manager >Ports (COM & LPT). The speed is 115200 baud.
      ![5](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/602e2963-2c0a-4d35-8152-11646cacf162)

   7. To set up the putty log file

      ![7](https://github.com/ASUS-IPC/ASUS-IPC/assets/126219571/dfe4de31-f699-4c71-a0d3-8714839a843b)


## 4. Others

### 4.1 ASUS IoT API (DIO Function Control)

* [Asus_API_Programming_Guide_v1.05_20240223.pdf](https://github.com/ASUS-IPC/ASUS-IPC/files/14986445/Asus_API_Programming_Guide_v1.05_20240223.pdf)

* [ASUS API (Library, Header files, Sample code](https://github.com/ASUS-IPC/ASUS-IPC/files/14986447/asusapi_1.0.5-2_aarch64-linux-gnu.zip)

