import JSZip from "jszip"
import { saveAs } from "file-saver"

const baseIndexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="index.js"></script>
</body>
</html>`

const baseIndexJS = `// import threejs from cdn
//import * as THREE from 'three'

`

export default class ProjectExporter {
  static Export(project: Engine.ScenePayload) {
    const zip = new JSZip()
    const folder = zip.folder("project")
    folder?.file("scene.json", JSON.stringify(project))
    folder?.file("index.html", ProjectExporter.generateHtmlFile(project))
    folder?.file("index.js", ProjectExporter.generateJsFile(project))
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "example.zip")
    })
  }

  private static generateHtmlFile(project: Engine.ScenePayload) {
    const html = baseIndexHTML
    return html
  }

  private static generateJsFile(project: Engine.ScenePayload) {
    const js = baseIndexJS
    return js
  }
}
