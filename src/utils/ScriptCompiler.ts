/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as three from "three"
import Component from "../engine/core/Component"
import ComponentManager from "../engine/core/ComponentManager"
import context from "../engine/core/EngineContext"
import SceneManager from "../engine/core/SceneManager"
import { generateNewEntity } from "./entity.utils"
import { formatScriptString, injectInitSection } from "./script.utils"

export default class ScriptCompiler {

  // Converts all scripts to components
  public static CompileScripts(scripts: Engine.Script[]) {
    Object.values(scripts).forEach((script) => {
      try {
        if (script.type === "component") {
          ScriptCompiler.CompileComponentScript(script)
        }
      } catch (err) {
        console.error(err)
      }
    })
  }

  private static CompileComponentScript(script: Engine.Script) {
    // References to be used when running eval
    const THREE = three
    const Instantiate = SceneManager.instance.buildEntity.bind(SceneManager.instance)
    const CreateEntity = generateNewEntity
    const Time = context.time;

    const scriptCopy = `${script.content}`
    const removePrefix = scriptCopy.substring(scriptCopy.indexOf("// <public>") + 11)
    let pureProps = removePrefix.substring(0, removePrefix.indexOf("// </public>"))
    pureProps = pureProps.replaceAll(";", ",")
    pureProps = pureProps.replaceAll("=", ":")
    let props: Record<string, Engine.ComponentType> = {}
    if (`${pureProps}`.replace(/\s/g, "").length) {
      pureProps = `{${pureProps}}`
      props = eval(`(${pureProps})`) // ! <-- Eval
    }
    let formattedScript = formatScriptString(script)
    formattedScript = injectInitSection(formattedScript, props)
    const NewComponent: any = eval(`(${formattedScript})`) // ! <-- Eval
    Object.setPrototypeOf(NewComponent, Component)

    ComponentManager.instance.registerComponent(script.name, NewComponent, props)
    SceneManager.instance.updateEntitiesComponentProps(script.name, props)
  }
}
