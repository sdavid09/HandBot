# The Hand Bot
The Hand Bot is a discord bot that adds ranks, currency, levels, and games. The Hand Bot focused on the Medieval Age for ranks.

## Setup
Currently needs roles created in discord server beforehand. The bot needs to be ranked higher than rest permissions. Also set "Display role members separately from online members" to true to show your roles in your sever.

## Installation
Requirements:
*node
*npm
```bash
npm install
```
## Test
```bash
npm run test --exit
```
## Run
```bash
node .\index.js
chcon -Rt svirt_sandbox_file_t  <path>
podman run -v /opt/HandBot/data:/opt/HandBot/data -d --name bot localhost/handbot
```
## Contributing
Shobin David
