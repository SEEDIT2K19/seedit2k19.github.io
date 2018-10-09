PS3 4.82 IDPS Dumper v0.2.3

Courtesy of:
W (Javascript, Research & Testing)
esc0rtd3w (Debugging, Research & Testing)
bguerville (ROP Chaining/Javascript & Debugging)

More Info at: http://www.psx-place.com


Steps:
1. Setup a small Web server on pc or smartphone. Python http server provided is not required in particular. Since v0.2.3, all other extra requirements have been removed. Don't come to us for explanations about how to run a http server though. Google it.
2. Extract the files in your http server root folder.
3. Put a fat32 USB key in port closest to BD Drive.
4. Open the ps3 browser & write the ip address of your server (and the port if not 80)
5. Run until ps3 beeps & shutdown. The idps should be on your USB drive as idps.bin. 


Usage Tips:

1) Try using a LAN connection or a solid WiFi connection during exploitation. A weak signal can cause problems.
2) If the exploit takes more than 5 minutes to work, reload page, browser, or restart console and try again.
3) If you are using a LAN connection and experience network issues, make sure all cables to router are in working order.


***********************
HISTORY
***********************
v0.2.3
- Added 4.82 support
- Removed all extra requirements like JQuery..
- Removed the need for string relocations to improve the initial memory search process & overall trigger times.
v0.2.1
- Added eMMC SuperSlim Support (CECH-40xxA, CECH-42xxA , CECH-43xxA)
- Misc Tweaks To Exploit

v0.2
- The AfterLeak Version

v0.1
- NOT RELEASED



#####################################################################################################################

The python server is no longer a requirement. Any web server correctly setup can serve the exploit without extra requirements.

The following instructions were only left for people who would wish to use python anyway...
How to use this with the python server:

*** MAKE SURE TO RUN AS ADMINISTRATOR ***

install python to use server.py or another HTTP server of your choosing on both Windows and Linux!

On windows - Install any of these optional HTTP servers:
MiniWeb: https://sourceforge.net/projects/miniweb/files/latest/download
Python (for server.py): https://www.python.org/ftp/python/2.7.14/python-2.7.14.msi
XAMPP: https://downloadsapachefriends.global.ssl.fastly.net/xampp-files/7.1.11/xampp-win32-7.1.11-0-VC14-installer.exe

On linux:
install python for your distribution using apt-get, yum, and similar commands.
make script executable using "chmod a+x server.py" or "chmod 775 server.py" or "chmod 777 server.py"
execute python script using "/usr/bin/python $exploitFolder/server.py" or "./server.py"

Then run (for python):
On windows - windows.bat
On linux - linux.sh