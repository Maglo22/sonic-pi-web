# Sonic-Pi-Web

Sonic-Pi-Web is a collaborative environment for Sonic Pi. It allows multiple users edit the same file in real time.

# Quick Start

## Installation

1. Make sure you have [Node](https://nodejs.org/en/) installed.

2. Clone the repository.

3. Inside the root directory run `npm install` to install dependencies.

4. Install [Etherpad-lite](https://github.com/ether/etherpad-lite).

5. Install [Sonic Pi](https://sonic-pi.net/).
    * _Note: Recent updates moved some files in Sonic Pi, which makes **sonic-pi-tool** fail to locate things properly; for now, is best to use a Sonic Pi version before 3.2_.

6. Install [sonic-pi-tool](https://github.com/lpil/sonic-pi-tool).

## Configuration

1. Run your instance of Etherpad-lite. A key will be generated in `APIKEY.txt`.

2. Copy this key to the file `/modules/etherpad-api.example.js`. For the tests to work, its also necessary to copy the key to `/test/3_etherpad-lite.js`

3. Either make a copy of this file and remove the `.example`, or just remove it from the original.

## Running

1. Run Etherpad-lite.

2. Run Sonic Pi through sonic-pi-tool: `sonic-pi-tool start-server`.

3. Run the application either with: `DEBUG=sonic-pi-web:* npm start` or just `npm start`.

# Technologies

The app integrates different technologies to achieve the collaboration of multiple users in real time, editing the same document of Sonic Pi.

## Back-end
### [Node JS](https://nodejs.org/en/)
The core app, the logic, is built in Node JS, using the [express](https://expressjs.com/) web framework.

### [Socket.io](https://socket.io/)
Socket.io is used to fire and listen for some events, like playing or stopping the current file being edited, and making the server respond acordingly.

### [Etherpad-lite](https://github.com/ether/etherpad-lite)
Etherpad-lite is the service that allows multiple users edit the same file in real time. Its pads are embbeded in the web app, where users write the code to be interpreted.

### [Sonic-Pi](https://sonic-pi.net/)
Sonic Pi needs to be there so the files are ran through its server; its being used as the interpreter.

### [Sonic-Pi-tool](https://github.com/lpil/sonic-pi-tool)
Allows controlling Sonic Pi from the command line. Using the commands available is how the code in the pads from the app are passed to Sonic Pi to interpret.

## Front-end
### [Skeleton](http://getskeleton.com/)
Skeleton provides a CSS bolierplate that is expanded a bit for the UI of the app.
### [jQuery](https://jquery.com/)
Used to embed the pads and interact with the Socket.io client in the pages of the app.
