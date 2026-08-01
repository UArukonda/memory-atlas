# Starting a server

- within your project folder:
- use `npm init` or `npm init -y` to create a project
- dependency step
  - `npm i express`
  - `npm install nodemon --save--dev`
- `package.json` file update:
  - create the following scripts -`"start":"node app.js"` -`"dev":"nodemon"`
  - ensure your "main" file is the one you created

# Express Basic `app.js` structure

```js
const express = require("express");
const app = express();
const PORT = 4000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`[server] listenig on ${HOST}:${PORT}`);
});
```
