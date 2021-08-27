import * as three from "three"
import { Component, ReactElement, useEffect, useState } from "react"
import { createContext } from "react"
import ComponentManager from "../../engine/core/ComponentManager"
import { formatScriptString, injectInitSection } from "../../utils/script.utils"
import SceneManager from "../../engine/core/SceneManager"
import { generateNewEntity } from "../../utils/entity.utils"

interface IScriptContext {
  scripts: Record<string, Engine.Script>
  selectedScript: Engine.Script | undefined
  scriptBody: string
  setScriptBody: (scriptBody: string) => void
  setScripts: (scripts: Record<string, Engine.Script>) => void
  setSelectedScript: (script: Engine.Script | undefined) => void
  compileScripts: () => void
}

const initialValue: IScriptContext = {
  scripts: {},
  selectedScript: undefined,
  scriptBody: "",
  setScriptBody: (scriptBody: string) => {},
  setScripts: (scripts: Record<string, Engine.Script>) => {},
  setSelectedScript: (script: Engine.Script | undefined) => {},
  compileScripts: () => {},
}

export const ScriptContext = createContext<IScriptContext>(initialValue)

export const ScriptProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[]
}) => {
  const [scripts, setScripts] = useState<Record<string, Engine.Script>>({})
  const [selectedScript, setSelectedScript] = useState<Engine.Script | undefined>()
  const [scriptBody, setScriptBody] = useState(selectedScript?.content ?? "")

  const compileScripts = () => {
    const THREE = three
    const Instantiate = SceneManager.instance.buildEntity.bind(SceneManager.instance)
    const CreateEntity = generateNewEntity

    Object.values(scripts).forEach((script) => {
      try {
        const scriptCopy = `${script.content}`
        const removePrefix = scriptCopy.substring(
          scriptCopy.indexOf("// <public>") + 11
        )
        let pureProps = removePrefix.substring(
          0,
          removePrefix.indexOf("// </public>")
        )
        pureProps = pureProps.replaceAll(";", ",")
        pureProps = pureProps.replaceAll("=", ":")
        let props: Record<string, Engine.ComponentType> = {}
        if (`${pureProps}`.replace(/\s/g, "").length) {
          pureProps = `{${pureProps}}`
          props = eval(`(${pureProps})`) // ! <-- dangerous usage of eval pt. 2 ;)
        }
        let formattedScript = formatScriptString(script)
        formattedScript = injectInitSection(formattedScript, props)
        const NewComponent: any = eval(`(${formattedScript})`) // ! <-- dangerous usage of eval ;)
        Object.setPrototypeOf(NewComponent, Component) // ! <-- lol
        ComponentManager.instance.registerComponent(script.name, NewComponent, props)
      } catch (err) {
        console.error(err)
      }
    })
  }

  useEffect(() => {
    compileScripts()
  }, [scripts])

  const contextValue = {
    scripts,
    setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    compileScripts,
  }

  return (
    <ScriptContext.Provider value={contextValue}>{children}</ScriptContext.Provider>
  )
}
