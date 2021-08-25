(this["webpackJsonpbrowser-engine"]=this["webpackJsonpbrowser-engine"]||[]).push([[0],{27:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var i=n(6),s=n.n(i),a=n(21),r=n.n(a),c=(n(27),n(5)),o={},l=Object(i.createContext)(o),u=function(e){var t=e.children,n={renderElement:Object(i.useRef)(null)};return Object(c.jsx)(l.Provider,{value:n,children:t})},d=n(9),h=n(8),f=n(16),v=n(0),y=n(1),m=n(22),p=n.n(m),b=n(2),j=n(3),g=function(){function e(t){Object(v.a)(this,e),this._entity=void 0,this._entity=t}return Object(y.a)(e,[{key:"init",value:function(e){}}]),e}(),x=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(e){var i;return Object(v.a)(this,n),(i=t.call(this,e)).name="mover",i._entity=void 0,i.speed=.1,i.transform=void 0,i._entity=e,i}return Object(y.a)(n,[{key:"init",value:function(e){var t;this.speed=null!==(t=null===e||void 0===e?void 0:e.speed)&&void 0!==t?t:.1,this.transform=this._entity.components.transform}},{key:"update",value:function(){this.transform.position.x+=this.speed}}]),n}(g),O=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(e){var i;return Object(v.a)(this,n),(i=t.call(this,e)).name="transform",i._entity=void 0,i.position=new h.Vector3(0,0,0),i.rotation=new h.Euler(0,0,0,"XYZ"),i.scale=new h.Vector3(1,1,1),i._entity=e,i}return Object(y.a)(n,[{key:"init",value:function(e){var t,n,i;console.debug("called init on transform"),this.position=null!==(t=null===e||void 0===e?void 0:e.position)&&void 0!==t?t:this.position,this.rotation=null!==(n=null===e||void 0===e?void 0:e.rotation)&&void 0!==n?n:this.rotation,this.scale=null!==(i=null===e||void 0===e?void 0:e.scale)&&void 0!==i?i:this.scale,this.applyMatrix()}},{key:"applyPosition",value:function(){this._entity.mesh.position.setX(this.position.x),this._entity.mesh.position.setY(this.position.y),this._entity.mesh.position.setZ(this.position.z)}},{key:"applyRotation",value:function(){this._entity.mesh.setRotationFromEuler(new h.Euler(this.rotation.x,this.rotation.y,this.rotation.z))}},{key:"applyScale",value:function(){this._entity.mesh.scale.setX(this.scale.x),this._entity.mesh.scale.setY(this.scale.y),this._entity.mesh.scale.setZ(this.scale.z)}},{key:"applyMatrix",value:function(){console.debug("applying matrix"),this._entity&&(this.applyPosition(),this.applyRotation(),this.applyScale())}},{key:"update",value:function(){this.applyMatrix()}}]),n}(g),E=function(){function e(){Object(v.a)(this,e),this.components={},e.instance||(e.instance=this,this.registerComponent("transform",O),this.registerComponent("mover",x))}return Object(y.a)(e,[{key:"registerComponent",value:function(e,t){this.components[e]=t}},{key:"getComponent",value:function(e){var t;return null!==(t=this.components[e])&&void 0!==t?t:null}},{key:"setComponent",value:function(e,t,n){var i=this.getComponent(t);if(i){Object.entries(n).forEach((function(e){var t=Object(d.a)(e,2),i=t[0],s=t[1];Array.isArray(s)&&(3===s.length?n[i]=new h.Vector3(s[0],s[1],s[2]):2===s.length&&(n[i]=new h.Vector2(s[0],s[1])))}));var s=new i(e);s.init(n),e.components[t]=s}else console.error("Component ".concat(t," not found"))}}]),e}();E.instance=void 0;var _=function(){function e(){Object(v.a)(this,e),e.instance||(e.instance=this)}return Object(y.a)(e,[{key:"getMaterial",value:function(e){switch(e){case"normal":return new h.MeshNormalMaterial;case"basic":default:return new h.MeshBasicMaterial}}}]),e}();_.instance=void 0;var k=function(){function e(){Object(v.a)(this,e),e.instance||(e.instance=this)}return Object(y.a)(e,[{key:"getGeometry",value:function(e){switch(e){case"box":return new h.BoxBufferGeometry;case"sphere":default:return new h.SphereBufferGeometry}}}]),e}();k.instance=void 0;var C=function(){function e(t){Object(v.a)(this,e),this.name="",this.mesh=void 0,this.id=void 0,this.children=[],this.components={},this.id=t.id,this.name=t.name,this.init(t)}return Object(y.a)(e,[{key:"init",value:function(e){var t=_.instance.getMaterial(e.material),n=k.instance.getGeometry(e.geometry);this.mesh=new h.Mesh(n,t),this.mesh.uuid=this.id,this.mesh.name=this.name,console.debug("called init"),this.initComponents(e.components)}},{key:"initComponents",value:function(e){var t=this;Object.entries(e).forEach((function(e){var n=Object(d.a)(e,2),i=n[0],s=n[1];E.instance.setComponent(t,i,s)}))}},{key:"addChild",value:function(e){}},{key:"addComponent",value:function(e,t){}},{key:"getProps",value:function(){return{}}},{key:"destroy",value:function(){}},{key:"update",value:function(){w.isPlaying()&&this._updateComponents()}},{key:"_updateComponents",value:function(){Object.values(this.components).forEach((function(e){return e.update()}))}}]),e}(),w=function(){function e(){Object(v.a)(this,e),this.isPlaying=!1,this._scene=new h.Scene,this._entities=[],this._scenePayload=void 0,this._axes=new h.AxesHelper(2),this._selectionHelper=void 0,this._selectedEntityID=void 0,e.instance||(e.instance=this,this._scene.add(this._axes))}return Object(y.a)(e,[{key:"getScene",value:function(){return this._scene}},{key:"setScenePayload",value:function(e){this._scenePayload=e}},{key:"updateEntityPayload",value:function(e,t){var n,i=this._entities.findIndex((function(t){return t.id===e}));-1!==i&&(this._entities[i].initComponents(t.components),null===(n=this._selectionHelper)||void 0===n||n.setFromObject(this._entities[i].mesh))}},{key:"updateScene",value:function(){this._entities.forEach((function(e){e.update()}))}},{key:"runPlayScene",value:function(){this.isPlaying=!0,this.resetScene(),this._scene.remove(this._axes),this.buildEntities()}},{key:"runEditScene",value:function(){this.isPlaying=!1,this.resetScene(),this._scene.add(this._axes),this.buildEntities()}},{key:"select",value:function(e){if(e||!this._selectionHelper){if(e){var t;if("BoxHelper"===e.type||"AxesHelper"===e.type)return;if(this._selectedEntityID=e.uuid,!this._selectionHelper)return this._selectionHelper=new h.BoxHelper(e,16776960),void this._scene.add(this._selectionHelper);null===(t=this._selectionHelper)||void 0===t||t.setFromObject(e),this._scene.add(this._selectionHelper)}}else this._scene.remove(this._selectionHelper)}},{key:"getSelectedEntity",value:function(){return this._selectedEntityID}},{key:"resetScene",value:function(){var e=this;this._entities.forEach((function(t){t.destroy(),e._scene.remove(t.mesh)})),this._entities=[]}},{key:"buildEntities",value:function(){var e=this;this._scenePayload&&this._scenePayload.sceneConfig.entities.forEach((function(t){e.buildEntity(t)}))}},{key:"buildEntity",value:function(e){var t=new C(e);return this._entities.push(t),this._scene.add(t.mesh),t}}],[{key:"isPlaying",value:function(){return e.instance.isPlaying}}]),e}();w.instance=void 0;p()(h);var S=function(){function e(){var t=this;if(Object(v.a)(this,e),this.renderer=new h.WebGLRenderer({antialias:!0}),this.renderElement=void 0,this.raycaster=new h.Raycaster,this.fov=45,this.near=.01,this.far=2e4,this.camera=void 0,this.controls=void 0,e.instance)return e.instance;e.instance=this,this._setCamera(),window.addEventListener("resize",(function(){return t.handleResize()}))}return Object(y.a)(e,[{key:"setup",value:function(e,t){this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderElement=e,this.renderElement.appendChild(this.renderer.domElement),this.handleResize(),this._setControls(),this._setRaycaster(),this._runSceneLoop(t)}},{key:"resetCamera",value:function(){this.renderer.setAnimationLoop(null)}},{key:"handleClick",value:function(e,t){var n=new h.Vector2(e,t);this.raycaster.setFromCamera(n,this.camera);var i=this.raycaster.intersectObjects(w.instance.getScene().children,!0);if(i.length>0){var s=i[0];w.instance.select(s.object)}else w.instance.select()}},{key:"_setCamera",value:function(){this.renderElement||(this.camera=new h.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.near,this.far))}},{key:"_runSceneLoop",value:function(e){var t=this;this.renderer.setAnimationLoop((function(n){return t.Update(e)}))}},{key:"_setRaycaster",value:function(){this.raycaster=new h.Raycaster,this.raycaster&&this.raycaster.params&&this.raycaster.params.Line}},{key:"_setControls",value:function(){this.camera.position.z=50}},{key:"handleResize",value:function(){this.renderElement&&(this.camera.aspect=this.renderElement.clientWidth/this.renderElement.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.renderElement.clientWidth,this.renderElement.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio))}},{key:"Update",value:function(e){this.renderer.render(e,this.camera),w.instance.updateScene()}}]),e}();S.instance=void 0;var M=new(function(){function e(){Object(v.a)(this,e),this.sceneManager=void 0,this.cameraManager=void 0,this.componentManager=void 0,this.materialManager=void 0,this.geometryManager=void 0,this._renderElement=void 0,this.sceneManager=new w,this.cameraManager=new S,this.componentManager=new E,this.materialManager=new _,this.geometryManager=new k}return Object(y.a)(e,[{key:"init",value:function(e,t){this._renderElement=e,t&&this.updateScenePayload(t),this.runEditMode()}},{key:"runPlayMode",value:function(){this.sceneManager.runPlayScene(),this.cameraManager.setup(this._renderElement,this.sceneManager.getScene())}},{key:"runEditMode",value:function(){this.sceneManager.runEditScene(),this.cameraManager.setup(this._renderElement,this.sceneManager.getScene())}},{key:"updateScenePayload",value:function(e){this.sceneManager.setScenePayload(e)}},{key:"updateSpecificEntity",value:function(e,t){this.sceneManager.updateEntityPayload(e,t)}},{key:"addNewEntity",value:function(e){this.sceneManager.buildEntity(e)}},{key:"isPlaying",value:function(){var e;return null!==(e=w.isPlaying())&&void 0!==e&&e}},{key:"handleClick",value:function(e,t){this.cameraManager.handleClick(e,t)}},{key:"getSelectedEntity",value:function(){return this.sceneManager.getSelectedEntity()}}]),e}()),P={sceneConfig:{entities:[],camera:{position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}},selectedEntityID:null,setEntities:function(e){},setSelectedEntityID:function(e){},setCameraProps:function(e){}},N=Object(i.createContext)(P),z=function(e){var t=e.children,n=Object(i.useState)({position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}),s=Object(d.a)(n,2),a=s[0],r=s[1],o=Object(i.useState)([{id:Object(f.v4)(),name:"Entity A",material:"normal",geometry:"box",children:[],components:{transform:{position:{x:3,y:.2,z:1},rotation:{x:3,y:3,z:3},scale:{x:2,y:1,z:1}}}}]),l=Object(d.a)(o,2),u=l[0],v=l[1],y=Object(i.useState)(null),m=Object(d.a)(y,2),p=m[0],b=m[1],j=Object(i.useMemo)((function(){return{entities:u,camera:a}}),[u,a]);Object(i.useEffect)((function(){if(p){var e=u.find((function(e){return e.id===p}));if(!e)return;M.updateSpecificEntity(p,e)}}),[j]);var g={sceneConfig:j,selectedEntityID:p,setEntities:v,setCameraProps:r,setSelectedEntityID:b};return Object(c.jsx)(N.Provider,{value:g,children:t})},R={scripts:[],setScripts:function(e){}},H=Object(i.createContext)(R),I=function(e){var t=e.children,n=Object(i.useState)([]),s=Object(d.a)(n,2),a={scripts:s[0],setScripts:s[1]};return Object(c.jsx)(H.Provider,{value:a,children:t})},A=n(18),D=function(){var e=Object(i.useContext)(N),t=e.sceneConfig,n=e.setEntities,s=e.selectedEntityID,a=e.setSelectedEntityID,r=Object(i.useMemo)((function(){var e;return null!==(e=t.entities.find((function(e){return e.id===s})))&&void 0!==e?e:null}),[t,s]);return{sceneConfig:t,selectedEntity:r,createEntity:function(){var e={id:Object(f.v4)(),name:"New Entity",geometry:"box",material:"normal",children:[],components:{transform:{position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1}}}};n([].concat(Object(A.a)(t.entities),[e])),M.addNewEntity(e)},selectEntity:function(e){a(e!==s?e:"")},updateEntity:function(e){var i=t.entities.findIndex((function(t){return t.id===e.id}));-1===i&&console.error("Couldn't find ".concat(e.id," in sceneConfig.entities")),t.entities[i]=e,n(Object(A.a)(t.entities))},updateEntityParent:function(e,t){}}},B=function(){var e=Object(i.useContext)(H);return{scripts:e.scripts,setScripts:e.setScripts,loadScript:function(e){},saveScript:function(e){},createScript:function(e){}}},L=function(){var e=B().scripts,t=D(),n=t.sceneConfig,s=t.selectEntity,a=Object(i.useContext)(l).renderElement,r=Object(i.useState)(M.isPlaying()),c=Object(d.a)(r,2),o=c[0],u=c[1],h=Object(i.useMemo)((function(){return{sceneConfig:n,scripts:e}}),[n,e]),f=Object(i.useCallback)((function(){a&&a.current&&h&&M.init(a.current,h)}),[a,h]);Object(i.useEffect)((function(){return f()}),[a,f]),Object(i.useEffect)((function(){M.updateScenePayload(h)}),[h]);return{renderElement:a,isRunning:o,toggleRun:function(){if(a&&a.current){if(w.isPlaying())return u(!1),void M.runEditMode();M.runPlayMode(),u(!0)}},handleClickScene:function(e){var t,n=e.target.getBoundingClientRect(),i=(e.clientX-n.x)/n.width*2-1,a=-(e.clientY-n.y)/n.height*2+1;M.handleClick(i,a),s(null!==(t=M.getSelectedEntity())&&void 0!==t?t:"")}}},V=n(14),F=function(e){var t=e.field,n=e.updateField;return"number"===typeof t||"string"===typeof t?Object(c.jsx)("div",{className:"bg-gray-700 text-white px-1  w-max",children:Object(c.jsx)("input",{type:"string"===typeof t?"string":"number",value:t,onChange:function(e){"number"!==typeof t?"string"===typeof t&&n(e.target.value):n(Number(e.target.value))},className:"bg-gray-700 w-min font-mono text-xs"})}):Array.isArray(t)?Object(c.jsx)("div",{children:"array field"}):Object(c.jsxs)("div",{className:"bg-gray-700 text-white px-2 grid grid-cols-3 gap-5",children:[Object(c.jsxs)("pre",{className:"text-xs p-0 m-0",children:[Object(c.jsx)("span",{className:"pr-2 text-xs text-gray-400",children:"x:"}),Object(c.jsx)("input",{type:"string"===typeof t?"string":"number",value:t.x,onChange:function(e){var i,s;return n({x:Number(e.target.value),y:null!==(i=null===t||void 0===t?void 0:t.y)&&void 0!==i?i:0,z:null!==(s=null===t||void 0===t?void 0:t.z)&&void 0!==s?s:0})},className:"bg-gray-700 w-min font-mono text-xs"})]}),Object(c.jsxs)("pre",{className:"text-xs p-0 m-0",children:[Object(c.jsx)("span",{className:"pr-2 text-xs text-gray-400",children:"y:"}),Object(c.jsx)("input",{type:"string"===typeof t?"string":"number",value:t.y,onChange:function(e){var i,s;return n({x:null!==(i=null===t||void 0===t?void 0:t.x)&&void 0!==i?i:0,y:Number(e.target.value),z:null!==(s=null===t||void 0===t?void 0:t.z)&&void 0!==s?s:0})},className:"bg-gray-700 w-min font-mono text-xs"})]}),Object(c.jsxs)("pre",{className:"text-xs p-0 m-0",children:[Object(c.jsx)("span",{className:"pr-2 text-xs text-gray-400",children:"z:"}),Object(c.jsx)("input",{type:"string"===typeof t?"string":"number",value:t.z,onChange:function(e){var i,s;return n({x:null!==(i=null===t||void 0===t?void 0:t.x)&&void 0!==i?i:0,y:null!==(s=null===t||void 0===t?void 0:t.y)&&void 0!==s?s:0,z:Number(e.target.value)})},className:"bg-gray-700 w-min font-mono text-xs"})]})]})},W=function(e){var t=e.componentType,n=e.componentProps,i=e.updateComponent;return Object(c.jsxs)("div",{className:"bg-gray-800 text-white p-2",children:[Object(c.jsx)("h3",{className:"font-semibold text-gray-300 text-sm mb-2",children:t}),Object.entries(n).map((function(e){var n=Object(d.a)(e,2),s=n[0],a=n[1];return Object(c.jsxs)("div",{className:"flex space-x-2",children:[Object(c.jsx)("p",{className:"text-xs font-mono text-gray-200",style:{minWidth:"10ch"},children:s}),Object(c.jsx)(F,{field:a,updateField:function(e){return i(t,s,e)}})]},s)}))]})};function G(){var e=D(),t=e.selectedEntity,n=e.updateEntity,s=e.sceneConfig,a=Object(i.useState)({}),r=Object(d.a)(a,2),o=r[0],l=r[1];Object(i.useEffect)((function(){t&&function(e){var t={};Object.entries(e.components).forEach((function(e){var n=Object(d.a)(e,2),i=n[0],s=n[1];t[i]=s})),console.debug("setting",t),l(Object(V.a)({},t))}(t)}),[t,s]);var u=function(e,i,s){console.debug(e,i,s,o);var a=Object(V.a)({},o);a[e][i]=s,console.debug("new controls",a),l(a),t&&(t.components=a,n(Object(V.a)({},t)))};return Object(c.jsxs)("div",{className:"bg-gray-900 h-full flex flex-col space-y-1",children:[Object.entries(o).map((function(e){var t=Object(d.a)(e,2),n=t[0],i=t[1];return Object(c.jsx)(W,{componentType:n,componentProps:i,updateComponent:u},n)})),t&&Object(c.jsx)("div",{className:"space-y-1",children:Object(c.jsx)("button",{className:"block mx-auto mt-12",onClick:function(){if(t){t.components.mover={speed:.2},n(t)}},children:"Add component"})})]})}function T(e){var t,n=e.entity,s=D(),a=s.selectedEntity,r=s.selectEntity,o=Object(i.useMemo)((function(){return(null===a||void 0===a?void 0:a.id)===n.id}),[a,n.id]);return Object(c.jsx)("div",{className:"\n    p-2\n    rounded-md\n    transition\n    cursor-pointer\n    select-none\n    ".concat(o?"hover:bg-indigo-500":"hover:bg-indigo-400","\n    ").concat(o&&"bg-indigo-300"),onClick:function(e){e.stopPropagation(),r(n.id)},children:Object(c.jsx)("h1",{children:null!==(t=null===n||void 0===n?void 0:n.name)&&void 0!==t?t:"__ENTITY__"})})}function Y(){var e=D().sceneConfig;return Object(c.jsx)("div",{className:"bg-indigo-200 p-1.5 space-y-1",children:e.entities.map((function(e){return Object(c.jsx)(T,{entity:e},e.id)}))})}function X(){var e,t=D(),n=t.createEntity,i=t.selectedEntity,s=L(),a=s.renderElement,r=s.toggleRun,o=s.isRunning,l=s.handleClickScene;return Object(c.jsxs)("main",{className:"w-screen h-screen overflow-hidden",children:[Object(c.jsx)("div",{className:"h-2 transition bg-red-600 ".concat(o&&"bg-green-500")}),Object(c.jsxs)("nav",{className:"bg-gray-900 p-2 space-x-2",children:[Object(c.jsxs)("button",{onClick:r,className:"primary",children:[o?"Stop":"Run"," Scene"]}),Object(c.jsx)("button",{onClick:n,className:"secondary",children:"Add Entity"})]}),Object(c.jsxs)("section",{className:"w-full h-full grid",style:{gridTemplateColumns:"1fr 17rem"},children:[a&&Object(c.jsx)("div",{className:"bg-gray-600",id:"scene",ref:a,onClick:function(e){return l(e)}}),Object(c.jsxs)("div",{className:"grid grid-rows-3 gap-0 5",children:[Object(c.jsx)(Y,{}),Object(c.jsx)("div",{className:"row-span-2",children:Object(c.jsx)(G,{},null!==(e=null===i||void 0===i?void 0:i.id)&&void 0!==e?e:"controls")})]})]})]})}var Z=function(){return Object(c.jsx)(z,{children:Object(c.jsx)(I,{children:Object(c.jsx)(u,{children:Object(c.jsx)(X,{})})})})};r.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(Z,{})}),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.e851eaec.chunk.js.map