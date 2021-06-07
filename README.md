# Youtube with Material-UI

This is a quick guide of how to start a `react` app using `Material-UI` open-source, front-end framework.

<br />

### Case Study - Youtube Enhanced on MacBook
<br />

  - Create a React app
   ```bash
      npx create-react-app youtube-enhanced
      cd youtube-enhanced/
      git init
   ```
  - Install imagemagick for MacBook - Big Sur 
   ```bash
      brew install imagemagick
         
      "ImageMagick depends on Ghostscript fonts. To install them type : "
         
      brew install ghostscript
   ````
  - Add the Font link to the html page at `'./public'`
    ```javascript
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    ```
  -   Create the Icons for the App, Android and iOS friendly.
       -  Using a third party site that provides the SVG file
          -  use magick convert the SVG file to ICO with name favicon.ico
         -    `
               magick -density 256x256 -background transparent favicon.svg -define icon:auto-resize -colors 256 favicon.ico
              ` 
       -  Using a third party site [Maskable](https://maskable.app/editor)
          - with the SVG >> upload, select masks & controls >> export 192x192 & 512x512 png images
          - save png images to youtube-enhanced/public

   - Push the Changes from terminal to GitHub
      - Add & commit locally
        ```bash
        (echo "/node_modules" ; echo ".DS_Store" ; echo ".env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local" ) >> .gitnignore
        git add .
        git commit -m "First commit"
        ```
      - On Github, create a new repository, & add upstream locally
         ```bash
         git checkout main
         git remote -v
         git remote add upstream 'insert repo'
         git remote -v
         git pull upstream main
         ```
   <br />

  - Install dependency [Material-UI](https://material-ui.com/getting-started/installation/)
      ```bash
         npm i @material-ui/core
         npm i @material-ui/icons
      ```
   - Install `react-router-dom`
      ```bash
         npm i --save react-router-dom
      ```
   - Install `youtube-react`
      ```bash
         npm i react-youtube
      ```
   - Install `moment`
      ```bash
         npm i --save moment react-moment
         npm i moment-duration-format
      ```
   - Install `uuidv4`
      ```bash
         npm i --save uuid
      ```
   - Install `axios`
      ```bash
         npm i axios
      ```
   - Install `local-ip-url`
      ```bash
         npm i local-ip-url --save-dev
      ```
      ```javascript
         const localIpUrl = require('local-ip-url')
         localIpUrl() // => 192.168.31.69
         localIpUrl('public', 'ipv6') // => fe80::c434:2eff:fe06:f90
      ```
