# Material-UI

This is a quick guide of how to start a `react` app using `Material-UI` which is an open-source, front-end framework.

### Case Study - Youtube Enhanced

  - Create a React app
  -   ```bash
      npx create-react-app youtube-enhanced
      cd youtube-enhanced/
      echo .gitnignore >> "/node_modules"
      git init
      ```
  - Install dependency [Material-UI](https://material-ui.com/getting-started/installation/)
  -   ```bash
      npm install @material-ui/core
      npm install @material-ui/icons
      ```
  - Install imagemagick for MAC - Big Sur 
  -  ```bash
     brew install imagemagick
         
     "ImageMagick depends on Ghostscript fonts. To install them, type : "
         
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