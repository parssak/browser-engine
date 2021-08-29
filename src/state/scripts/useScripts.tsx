import { useContext, useEffect, useState } from "react"
import { generateNewScript } from "../../utils/script.utils"
import { ScriptContext } from "./ScriptContext"

const useScripts = () => {
  const {
    scripts,
    setScripts,
    selectedScript,
    setSelectedScript,
    compileScripts,
    scriptBody,
    setScriptBody,
  } = useContext(ScriptContext)

  const loadScript = (
    scriptName: string | Engine.ScriptID,
    method: 'name' | 'id' = 'name'
  ) => {
    let foundScript
    if (method === 'name') {
      foundScript = scripts[scriptName]
    } else if (method === 'id') {
      foundScript = Object.values(scripts).find(script => script.id === scriptName)
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
      updatedScriptsObject[newScript.name] = newScript
    })

    setScripts(updatedScriptsObject)
    return newScripts
  }

  return {
    scripts: Object.values(scripts),
    setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
  }
}

export default useScripts
