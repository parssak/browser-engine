import { useContext } from "react"
import { generateNewScript } from "../../utils/script.utils"
import { scriptBody, ScriptContext, setScriptBody } from "./ScriptContext"

const useScripts = () => {
  const {
    scripts,
    setScripts,
    selectedScript,
    setSelectedScript,
    compileScripts,
  } = useContext(ScriptContext)

  const loadScript = (
    scriptName: Engine.ScriptID | string,
    method: "name" | "id" = "id"
  ) => {
    console.debug('loading script', scriptName, method, scripts)
    let foundScript
    if (method === "id") {
      foundScript = scripts[scriptName]
    } else if (method === "name") {
      foundScript = Object.values(scripts).find((script) => script.name === scriptName)
    }
    setSelectedScript(foundScript)
    setScriptBody(foundScript?.content ?? "")
  }

  const saveScript = (script: Engine.Script) => {
    const foundScript = Object.values(scripts).find((s) => s.id === script.id)
    if (!foundScript) return
    foundScript.content = scriptBody
    compileScripts()
  }

  interface CreateScriptPayload {
    name: string
    language: Engine.Language
    type: Engine.ScriptType
  }

  const createScript = (scriptsPayload: CreateScriptPayload[]): Engine.Script[] => {
    const newScripts: Engine.Script[] = []
    const updatedScriptsObject = scripts
    scriptsPayload.forEach((scriptPayload) => {
      const newScript = generateNewScript(
        scriptPayload.name,
        scriptPayload.language,
        scriptPayload.type
      )
      newScripts.push(newScript)
      updatedScriptsObject[newScript.id] = newScript
    })

    setScripts({ ...updatedScriptsObject })
    return newScripts
  }

  return {
    scripts: Object.values(scripts),
    _setScripts: setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
    _compileScripts :compileScripts,
  }
}

export default useScripts
