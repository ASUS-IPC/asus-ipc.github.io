# Modem Connectivity Manager

## 1. Version Table

* **OS version table for modem connectivity manager tools:**  

    |Model-OS | PE100A - Yocto 2.5 (sumo) | PE100A - Yocto 3.2 | PV100A - Yocto 2.5 (sumo) |
    |:-:|:-:|:-:|:-:|
    |Quectel-CM   | ver < 1.0.11            | ver < 0.0.3 | ver < 0.0.21             |
    |ModemManager | 1.0.11 <= ver <= 1.0.15 | --          | 0.0.21 <= ver <= 0.0.23  |
    |ASUS-CM      | 1.0.15 < ver            | 0.0.3 < ver | 0.0.23 < ver             |

    * You can check the file name of release image to get the verion number:
        * **PE100A_YOCTO_1.0.13**_202109150127_UTC_RELEASE: **PE100A Yocto 2.5 (sumo)**, ver = **1.0.13**
        * **PE100A_YOCTO-3.2_1.0.5**_202203180514_UTC_RELEASE: **PE100A Yocto 3.2**, ver = **1.0.5**
        * **PV100A**-2G_**YOCTO_1.0.3**_202203250606_UTC_RELEASE: **PV100A Yocto 2.5 (sumo)**, ver = **1.0.3**
    * You can also check the current release version number by `cat /etc/os-release` and make sure that the SOP or document is correct for your OS version:  

        ````
        sh-4.4# cat /etc/os-release
        ID="asus-imx-xwayland"
        NAME="NXP i.MX Release Distro"
        VERSION="4.14-sumo (sumo)"
        VERSION_ID="4.14-sumo"
        PRETTY_NAME="NXP i.MX Release Distro 4.14-sumo (sumo)"
        BUILD_ID="20210914081706"
        BUILD_VERSION="1.0.13_202109140813_UTC_DEBUG"
        ````


## 2. Quectel-CM

* **LTE SOP for Quectel-CM**
* **Please be noticed that this guide is only for version listed below:**

    | OS version      | PE100A  | PV100A |
    |-|-|-|
    |Yocto 2.5 (sumo) | version < 1.0.11 | version < 0.0.21 | 
    |Yocto 3.2        | version < 0.0.3  | --  |

    We use **Quectel-CM** to establish cellular data connection, and also provide additional tool to setup connection settings. With **AUTO_CONNECT** enabled, your device will execute **Quectel-CM** with the settings located at `/etc/lte/lte.conf` after device boot up.

    **Default settings:**

    ```
    APN=internet
    PIN=0000
    AUTO_CONNECT=y
    ```

* **Setup APN:**
    ```
    lte.sh set-apn <apn>
    ```
* **Setup PIN lock:**
    ```
    lte.sh set-pin <pin>
    ```
* **Setup Auto-Connect:**
    ```
    lte.sh set-auto <y/n>
    ```
* **Reset settings to default:**
    ```
    lte.sh reset
    ```
* **Execute quectel-CM tool individually:**
    ```
    quectel-CM –s <apn> -p <pin>
    ```


## 3. ModemManager

* **LTE SOP for ModemManager**
* **Please be noticed that this guide is only for version listed below:**

    | OS version      | PE100A  | PV100A |
    |-|-|-|
    |Yocto 2.5 (sumo) | 1.0.11 <= version <= 1.0.15 | 0.0.21 <= version <= 0.0.23 | 
    |Yocto 3.2        | --                          | --                          |

    We use modem manager to establish cellular data connection, and also provide additional tool to setup and remain data connection. With **AUTO_CONNECT** enabled, your device will automatically establish data connection once it registered to the mobile network.

    For modem manager usage and details, please visit https://www.freedesktop.org/wiki/Software/ModemManager/

    **Default settings:**

    ```
    PIN=0000
    AUTO_CONNECT=y
    ```

* **Setup PIN lock:**
    ```
    lte.sh set-pin <pin>
    ```
* **Setup Auto-Connect:**
    ```
    lte.sh set-auto <y/n>
    ```
* **Reset settings to default:**
    ```
    lte.sh reset
    ```


## 4. ASUS Connectivity Manager

* **ASUS Connectivity Manager Command Line Interface User Manual**

* **Introduction**

    ASUS Connectivity manager is a tool on user space that helps user to establish data connection through modem manager and network manager easily. It also provide features for auto reconnect on cellular network and failover with all network interfaces to ensure that device is always online.

    **Supported functions:**
    * Auto generate cellular network settings based on SIM card info
    * Retrive register status, signal, cell location, SIM card info from modem
    * Power and flight mode control on modem
    * Failover through different network interfaces
    * Auto connect to cellular network when available



* **Usage**

    The basic ASUS Connectivity manager command pattarn is as followed:
    ```
        asus_cmcli [COMMAND] [PARAMS]
    ```
    Which **COMMAND** means different function and **PARAMS** are depanded on what command needs.
In addition to termainal, logs will also printed at /var/log/syslog while executing asus_cmcli.

### 4.1. Get modem info
```
    asus_cmcli get_modems
```
* **Description**  
    Get the information of modems.

* **Return**
    ```
    sh-5.0# asus_cmcli get_modems
    Index: 0
    Path: /org/freedesktop/ModemManager1/Modem/0
    Manufacturer: QUALCOMM INCORPORATED
    Name: QUECTEL Mobile Broadband Module
    Version: EC25JFAR06A05M4G
    ```

### 4.2. Start network
```
    asus_cmcli start
```
* **Description**  
    Start the cellular network connectivity.

* **Return**
    ```
    sh-5.0# asus_cmcli start
    no previous settings, create new by sim's mcc mnc
    modem detected
    check profile with mcc=466 and mnc=92
    use connection settings with apn=internet, user=, password=
    connecting...
    ```

### 4.3. Stop network
```
    asus_cmcli stop
```
* **Description**  
    Stop the cellular network connectivity.

* **Return**
    ```
    sh-5.0# asus_cmcli stop
    disconnecting Cellular...
    Connection 'Cellular' successfully deactivated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/4)
    ```

### 4.4 Power on
```
    asus_cmcli power_on
```
* **Description**  
    Power on the modem.

* **Return**
    ```
    sh-5.0# asus_cmcli power_on
    modem power state is on
    power already on

    ```

### 4.5. Power off
```
    asus_cmcli power_off
```
* **Description**  
    Power off the modem.

* **Return**
    ```
    sh-5.0# asus_cmcli power_off
    modem power state is on
    set modem power state off

    ```

### 4.6. Power cycle
```
    asus_cmcli power_cycle
```
* **Description**  
    Power off and power on the modem.

* **Return**
    ```
    sh-5.0# asus_cmcli power_cycle
    modem power state is on
    set modem power state off
    modem power state is off
    reset modem to turn on
    ```

### 4.7. Keep alive
```
    asus_cmcli keepalive [PARAMS]
```
* **Description**  
    Control the keep alive feature for connecting to cellular network automaticly.

* **Parameters**  
    |Params|Description|
    |-|-|
    |status|Show current status|
    |start|Turn on the keep alive feature|
    |stop|Turn off the keep alive feature|

* **Return**
    ```
    sh-5.0# asus_cmcli keepalive status
    Keepalive status: on
    sh-5.0# asus_cmcli keepalive stop
    Disable keepalive service
    sh-5.0# asus_cmcli keepalive start
    Enable keepalive service
    ```

### 4.8. Get status
```
    asus_cmcli status
```
* **Description**  
    Get the status of the cellular network connection and the information of IP.

* **Return**
    ```
    sh-5.0# asus_cmcli status
    Connected: yes
    Interface: wwan0
    Apn: internet
    Roaming: allowed
    IPv4 address: 10.44.15.29
    IPv4 gateway: 10.44.15.30
    IPv4 mtu: 1500
    IPv4 dns: 168.95.1.1 / 168.95.192.1
    IPv6 address: --
    IPv6 gateway: --
    IPv6 mtu: --
    IPv6 dns: --
    ```

### 4.9. Get attached status
```
    asus_cmcli attach_status
```
* **Description**  
    Get the attached status of the modem, including the state of the modem and the access technology that the modem use with, or connection status to carrier’s network.

* **Return**
    ```
    sh-5.0# asus_cmcli attach_status
    Registration state: connected
    Flight mode: off
    Radio interface: lte
    ```

### 4.10. Switch SIM
```
    asus_cmcli switch_sim [PARAMS]
```
* **Description**  
    Switch the SIM slot, only available on the device with multiple SIM slots.

* **Parameters**  
    |Params|Description|
    |-|-|
    |Id|SIM slot Ids|

* **Return**
    ```
    sh-5.0# asus_cmcli switch_sim 1
    set sim_id as 1
    Completion code = 0x00
    ```
        
### 4.11. Unlock SIM
```
    asus_cmcli unlock_pin [PARAMS]
```
* **Description**  
    Unlock the SIM by PIN code.

* **Parameters**  
    |Params|Description|
    |-|-|
    |PinCode|SIM card’s PIN code|

* **Return**
    ```
    sh-5.0# asus_cmcli unlock_pin 0000
    successfully sent PIN code to the SIM
    ```

### 4.12. Flight mode
```
    asus_cmcli set_flight_mode [PARAMS]
```
* **Description**  
    Turm on or turn off the flight mode.

* **Parameters**  
    |Params|Description|
    |-|-|
    |on |Turm on the flight mode.|
    |off|Turn off the flight mode.|

* **Return**
    ```
    sh-5.0# asus_cmcli set_flight_mode off
    successfully enabled the modem
    ```        

### 4.13. Set APN
```
    asus_cmcli set_apn [PARAMS]
```
* **Description**  
    Set APN to the profile.

* **Parameters**  
    |Params|Description|
    |-|-|
    |APN |Access Point Name for connecting to the carrier's cellular network. |
    
* **Return**
    ```
    sh-5.0# asus_cmcli set_apn internet
    modify connection settings with apn=internet
    ```
        
### 4.14. Set user
```
    asus_cmcli set_user [PARAMS]
```
* **Description**  
    Set user name to the profile.

* **Parameters**  
    |Params|Description|
    |-|-|
    |User |User name for connecting to the carrier's cellular network. |

* **Return**
    ```
    sh-5.0# asus_cmcli set_user myUser
    modify connection settings with user=myUser
    ```
        
### 4.15. Set password
```
    asus_cmcli set_password [PARAMS]
```
* **Description**  
    Set password to the profile.

* **Parameters**  
    |Params|Description|
    |-|-|
    |Password |Password for connecting to the carrier's cellular network. |

* **Return**
    ```
    sh-5.0# asus_cmcli set_password myPassword
    modify connection settings with password=myPassword
    ```
        
### 4.16. Set IP Type
```
    asus_cmcli set_ip_type [PARAMS]
```
* **Description**  
    Set allowed IP type to the profile.

* **Parameters**  
    |Params|Description|
    |-|-|
    |ipv4  |Allowed IPv4 method type for connecting to the carrier's cellular network.|
    |ipv6  |Allowed IPv6 method type for connecting to the carrier's cellular network.|
    |ipv4v6|Allowed both IPv4 and IPv6 method type for connecting to the carrier's cellular network.|

* **Return**
    ```
    sh-5.0# asus_cmcli set_ip_type ipv6
    modify connection settings with ip type=ipv6
    ```

### 4.17. Get profile
```
    asus_cmcli get_profile
```
* **Description**  
    Get the information of the profile.

* **Return**
    ```
    sh-5.0# asus_cmcli get_profile
    Apn: this.is.apn
    User: this.is.user
    Password: this.is.password
    Ipv4: disabled
    Ipv6: auto
    ```

### 4.18. Reset profile
```
    asus_cmcli reset_profile
```
* **Description**  
    Reset the profile to default value, generated based on carrier’s MCCMNC.

* **Return**
    ```
    sh-5.0# asus_cmcli reset_profile
    modem detected
    check profile with mcc=466 and mnc=92
    use connection settings with apn=internet, user=, password=
    ```

### 4.19. Switch carrier
```
    asus_cmcli switch_carrier [PARAMS]
```
* **Description**  
    Switch the register network with the input of the carrier’s MCCMNC.

* **Parameters**  
    |Params|Description|
    |-|-|
    |MCCMNC  |Carrier’s Mobile Country Code and Mobile Network Code.|

* **Return**
    ```
    sh-5.0# asus_cmcli switch_carrier 55123
    disconnecting Cellular...
    Connection 'Cellular' successfully deactivated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/1)
    successfully registered the modem
    ```

### 4.20. Check carrier
```
    asus_cmcli check_carrier
```
* **Description**  
    Get the information of the carrier including MCC, MNC, and the name of the carrier.

* **Return**
    ```
    sh-5.0# asus_cmcli check_carrier
    MCC: 466
    MNC: 92
    Operator name: Chunghwa

    ```
        
### 4.21. Get ICCID
```
    asus_cmcli iccid
```
* **Description**  
    Get the Integrate Circuit Card Identity.

* **Return**
    ```
    sh-5.0# asus_cmcli iccid
    Iccid: 89886920042034712146
    ```
        
### 4.22. Get IMSI
```
    asus_cmcli imsi
```
* **Description**  
    Get the International Mobile Subscriber Identity.

* **Return**
    ```
    sh-5.0# asus_cmcli imsi
    Imsi: 466924203471214
    ```
        
### 4.23. Get signal strength
```
    asus_cmcli signal
```
* **Description**  
    Get the percentage of the signal strength.

* **Return**
    ```
    sh-5.0# asus_cmcli signal
    Signal strength: 71%
    ```
        
### 4.24. Get advanced signal info
```
    asus_cmcli signal_adv
```
* **Description**  
    Get the signal strength of the different measurement.

* **Return**
    ```
    sh-5.0# asus_cmcli signal_adv
    Evdo rssi: -- dBm
    Evdo ecio: -- dBm
    Evdo sinr: -- dB
    Evdo io: -- dBm
    Gsm rssi: -- dBm
    Umts rssi: -- dBm
    Umts rscp: -- dBm
    Umts ecio: -- dBm
    Lte rssi: -69.00 dBm
    Lte rsrq: -9.00 dB
    Lte rsrp: -95.00 dBm
    Lte snr: 22.20 dB
    ```
        
### 4.25. Get cell location info
```
    asus_cmcli location_info
```
* **Description**  
    Get the information of the cell location.

* **Return**
    ```
    sh-5.0# asus_cmcli location_info
    Operator code: 466
    Operator name: 92
    Location area code: FFFE
    Tracking area code: 2C24
    Cell id: 03406935

    ```
        
### 4.26. Set failover
```
    asus_cmcli failover set [PARAM1] [PARAM2]
```
* **Description**  
    Set variables of the failover feature.

* **Parameters**  
    |Params1 |Param2       | Description                             |
    |-|-|-|
    |status  |on           | Turn on the failover service.           |
    |status  |off          | Turn off the failover service.          |
    |group   |InterfaceName| Set the priority interface of the group.|

* **Return**
    ```
    sh-5.0# asus_cmcli failover set status on
    sh-5.0# asus_cmcli failover set group wwan0 eth0 wlan0
    sh-5.0# asus_cmcli failover show group
    wwan0, eth0, wlan0
    sh-5.0# asus_cmcli failover show status
    on
    ```
        
### 4.27. Get failover status
```
    asus_cmcli failover show [PARAMS]
```
* **Description**  
    Get variables of the failover feature.

* **Parameters**  
    |Params|Description|
    |-|-|
    |status |Show the status of the failover feature, on or off.|
    |group  |Show the interface priority of the group. |

* **Return**
    ```
    sh-5.0# asus_cmcli failover show group
    wwan0, eth0, wlan0
    sh-5.0# asus_cmcli failover show status
    on
    ```

&nbsp;