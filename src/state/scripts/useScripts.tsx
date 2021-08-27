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

  const loadScript = (scriptName: string) => {
    const foundScript = scripts[scriptName]
    setSelectedScript(foundScript)
    setScriptBody(foundScript?.content ?? "")
  }

  const saveScript = (script: Engine.Script) => {
    const foundScript = Object.values(scripts).find((s) => s.id === script.id)
    if (!foundScript) return
    foundScript.content = scriptBody;
    compileScripts()
  }

  const createScript = (name: string) => {
    const newScript = generateNewScript(name)
    setScripts({ ...scripts, [newScript.name]: newScript })
  }

  useEffect(() => {
    console.debug("script body is", scriptBody)
  }, [scriptBody])

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
