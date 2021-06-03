# Material-UI

This is a quick guide of how to start a `react` app using `Material-UI` which is an open-source, front-end framework.

### Case Study - Youtube Enhanced

  - Create a React app
  -   ```bash
      npx create-react-app youtube-enhanced
      cd youtube-enhanced/
      git init
      ```
  - Install imagemagick for MacBook - Big Sur 
  -  ```bash
     brew install imagemagick
         
     "ImageMagick depends on Ghostscript fonts. To install them type : "
         
     brew install ghostscript
     ````
  - Add the Font link to the html page ./public
  -  ```javascript
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
      - ```bash
         git add
         echo >> "/node_modules" .gitnignore
         git commit -m "First commit"
        ```
      - On Github, create a new repository
   
  - Install dependency [Material-UI](https://material-ui.com/getting-started/installation/)
      -  ```bash
         npm i @material-ui/core
         npm i @material-ui/icons
         ```
   - Install `react-router-dom`
      -  ```bash
         npm i --save react-router-dom
         ```
   - Install `youtube-react`
      -  ```bash
         npm i react-youtube
         ```
   - Install `moment`
      -  ```bash
         npm i --save moment react-moment
         ```
   - Install `uuidv4`
      -  ```bash
         npm i --save uuid
         ```
   - Install `axios`
      -  ```bash
         npm i axios
         ```
   - Install `local-ip-url`
      -  ```bash
         npm install local-ip-url --save-dev
         ```
         ```react
         const localIpUrl = require('local-ip-url')
         localIpUrl() // => 192.168.31.69
         localIpUrl('public', 'ipv6') // => fe80::c434:2eff:fe06:f90
         ```