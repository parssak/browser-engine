import React, { ReactElement, useState } from 'react'
import GeometryManager from '../../../../engine/core/GeometryManager'
import MaterialManager from '../../../../engine/core/MaterialManager'
import useScene from '../../../../state/scene/useScene'
import { SelectOption } from '../../../interfaces'

interface Props {
  selectedEntity: Engine.EntityProps;
}

export default function MeshNode({ selectedEntity }: Props): ReactElement {
  const { updateEntity } = useScene()

  const [materialType, setMaterialType] = useState<Engine.MaterialType>("normal")
  const [geometryType, setGeometryType] = useState<Engine.GeometryType>("box")

   const updateMaterial = (newMaterial: Engine.MaterialType) => {
     setMaterialType(newMaterial)
     if (selectedEntity) {
       selectedEntity.material = newMaterial
       updateEntity({ ...selectedEntity })
     }
   }

   const updateGeometry = (newGeometry: Engine.GeometryType) => {
     setGeometryType(newGeometry)
     if (selectedEntity) {
       selectedEntity.geometry = newGeometry
       updateEntity({ ...selectedEntity })
     }
   }

   const getMaterialOptions = (): SelectOption[] => {
     return Object.keys(MaterialManager.instance.materials).map((material) => ({
       label: material,
       value: material,
     }))
   }

   const materialOptions: SelectOption[] = getMaterialOptions()

   const getGeometryOptions = (): SelectOption[] => {
     return Object.keys(GeometryManager.instance.geometries).map((geometry) => ({
       label: geometry,
       value: geometry,
     }))
   }

  const geometryOptions: SelectOption[] = getGeometryOptions()
  
  return (
    <section>
      <div className="bg-gray-800 text-white">
        <h3>Mesh</h3>
        <div className="space-y-2">
          <div className="flex space-x-2 items-center">
            <p className="inspector-field-label">Material</p>
            <select onChange={(e) => updateMaterial(e.target.value)} value={materialType}>
              {materialOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 items-center">
            <p className="inspector-field-label">Geometry</p>
            <select onChange={(e) => updateGeometry(e.target.value)} value={geometryType}>
              {geometryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
