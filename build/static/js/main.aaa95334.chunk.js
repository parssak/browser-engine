(this["webpackJsonpbrowser-engine"]=this["webpackJsonpbrowser-engine"]||[]).push([[0],{39:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),s=n(20),o=n.n(s),c=(n(39),n(9)),a={},u=Object(i.createContext)(a),l=function(e){var t=e.children,n={renderElement:Object(i.useRef)(null)};return Object(c.jsx)(u.Provider,{value:n,children:t})},d=n(5),h=n(11),f=n(25),v={sceneConfig:{entities:[],camera:{position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}},selectedEntityID:null,setEntities:function(e){},setSelectedEntityID:function(e){},setCameraProps:function(e){}},m=Object(i.createContext)(v),p=function(e){var t=e.children,n=Object(i.useState)({position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}),r=Object(d.a)(n,2),s=r[0],o=r[1],a=Object(i.useState)([{id:Object(f.v4)(),name:"Entity A",material:new h.MeshNormalMaterial,geometry:new h.BoxBufferGeometry,children:[],components:{transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]}}}]),u=Object(d.a)(a,2),l=u[0],v=u[1],p=Object(i.useState)(null),b=Object(d.a)(p,2),j={sceneConfig:{entities:l,camera:s},setEntities:v,setCameraProps:o,selectedEntityID:b[0],setSelectedEntityID:b[1]};return Object(c.jsx)(m.Provider,{value:j,children:t})},b={scripts:[],setScripts:function(e){}},j=Object(i.createContext)(b),g=function(e){var t=e.children,n=Object(i.useState)([]),r=Object(d.a)(n,2),s={scripts:r[0],setScripts:r[1]};return Object(c.jsx)(j.Provider,{value:s,children:t})},O=n(1),y=n(2),E=n(32),C=n.n(E)()(h),x=function(){function e(){var t=this;if(Object(O.a)(this,e),this.renderer=new h.WebGLRenderer({antialias:!0}),this.renderElement=void 0,this.fov=45,this.near=.01,this.far=2e4,this.camera=void 0,this.controls=void 0,e.instance)return e.instance;e.instance=this,this._setCamera(),window.addEventListener("resize",(function(){return t.handleResize()}))}return Object(y.a)(e,[{key:"setup",value:function(e,t){this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderElement=e,this.renderElement.appendChild(this.renderer.domElement),this.handleResize(),this._setControls(),this._runSceneLoop(t)}},{key:"resetCamera",value:function(){this.renderer.setAnimationLoop(null)}},{key:"_setCamera",value:function(){this.renderElement||(this.camera=new h.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.near,this.far))}},{key:"_runSceneLoop",value:function(e){var t=this;this.renderer.setAnimationLoop((function(n){return t.Update(e)}))}},{key:"_setControls",value:function(){this.controls=new C(this.camera,this.renderer.domElement),this.controls.autoRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.39,this.camera.position.z=200,this.controls.update()}},{key:"handleResize",value:function(){this.renderElement&&(this.camera.aspect=this.renderElement.clientWidth/this.renderElement.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.renderElement.clientWidth,this.renderElement.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio))}},{key:"Update",value:function(e){this.controls.update(),this.renderer.render(e,this.camera),N.UpdateScene()}}]),e}();x.instance=void 0;var w=n(3),_=n(4),S=function(){function e(){Object(O.a)(this,e),this._entity=void 0}return Object(y.a)(e,[{key:"init",value:function(e,t){this._entity=e}}]),e}(),k=function(e){Object(w.a)(n,e);var t=Object(_.a)(n);function n(){var e;Object(O.a)(this,n);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).name="transform",e._entity=void 0,e.position=new h.Vector3(0,0,0),e.rotation=new h.Euler(0,0,0,"XYZ"),e.scale=new h.Vector3(1,1,1),e}return Object(y.a)(n,[{key:"init",value:function(e,t){var n,i,r;console.debug("created new transform"),this._entity=e,this.position=null!==(n=null===t||void 0===t?void 0:t.position)&&void 0!==n?n:this.position,this.rotation=null!==(i=null===t||void 0===t?void 0:t.rotation)&&void 0!==i?i:this.rotation,this.scale=null!==(r=null===t||void 0===t?void 0:t.scale)&&void 0!==r?r:this.scale}},{key:"Update",value:function(){this._entity&&(console.debug("transform update"),this._entity.mesh.position.setX(this.position.x),this._entity.mesh.position.setY(this.position.y),this._entity.mesh.position.setZ(this.position.z))}}]),n}(S),R=function(){function e(){Object(O.a)(this,e),this.components={},e.instance||(e.instance=this,this.registerComponent("transform",k))}return Object(y.a)(e,[{key:"registerComponent",value:function(e,t){this.components[e]=t}},{key:"getComponent",value:function(e){var t;return null!==(t=this.components[e])&&void 0!==t?t:null}},{key:"setComponent",value:function(e,t,n){var i=this.getComponent(t);if(i){Object.entries(n).forEach((function(e){var t=Object(d.a)(e,2),i=t[0],r=t[1];Array.isArray(r)&&(3===r.length?n[i]=new h.Vector3(r[0],r[1],r[2]):2===r.length&&(n[i]=new h.Vector2(r[0],r[1])))})),console.debug(n);var r=new i;r.init(e,n),e.components[t]=r}else console.error("Component ".concat(t," not found"))}}]),e}();R.instance=void 0;var M=function(){function e(t){var n,i;Object(O.a)(this,e),this.name="",this.mesh=void 0,this._id=void 0,this.children=[],this.components={};var r=null!==(n=t.material)&&void 0!==n?n:new h.MeshBasicMaterial,s=null!==(i=t.geometry)&&void 0!==i?i:new h.BoxBufferGeometry;this.mesh=new h.Mesh(s,r),this._id=t.id,this._initComponents(t.components)}return Object(y.a)(e,[{key:"_initComponents",value:function(e){var t=this;console.debug("Called init components:",e),Object.entries(e).forEach((function(e){var n=Object(d.a)(e,2),i=n[0],r=n[1];R.instance.setComponent(t,i,r)}))}},{key:"addChild",value:function(e){}},{key:"addComponent",value:function(e,t){}},{key:"getProps",value:function(){return{}}},{key:"Update",value:function(){console.debug("calling update on entity",this._id),N.isRunning&&this._updateComponents()}},{key:"_updateComponents",value:function(){Object.values(this.components).forEach((function(e){return e.Update()}))}}]),e}(),N=function(){function e(){Object(O.a)(this,e),e.instance||(e.instance=this)}return Object(y.a)(e,null,[{key:"CreateEntity",value:function(t,n){var i=new M(t);return n&&n.addChild(i),e._entities.push(i),this._scene.add(i.mesh),i}},{key:"Initialize",value:function(e){this.cameraManager||(this.cameraManager=new x),this.componentManager||(this.componentManager=new R),this._renderElement=e,this.cameraManager.setup(e,this._scene)}},{key:"UpdateScene",value:function(){e._entities.forEach((function(e){e.Update()}))}},{key:"CreateComponent",value:function(e,t){}},{key:"Run",value:function(t){e.isRunning=!0,this.ResetScene(),t.sceneConfig.entities.forEach((function(t){e.CreateEntity(t)})),this.cameraManager.setup(this._renderElement,this._scene)}},{key:"Stop",value:function(){e.isRunning=!1,this.ResetScene(),this.cameraManager.setup(this._renderElement,this._scene)}},{key:"ResetScene",value:function(){this._scene=new h.Scene,this._entities=[],this.cameraManager.resetCamera()}}]),e}();N.instance=void 0,N.isRunning=!1,N._scene=new h.Scene,N.cameraManager=x.instance,N.componentManager=R.instance,N._entities=[],N._renderElement=void 0;var P=n(14),I=function(){var e=Object(i.useContext)(m),t=e.sceneConfig,n=e.setEntities,r=e.selectedEntityID,s=e.setSelectedEntityID,o=Object(i.useMemo)((function(){var e;return null!==(e=t.entities.find((function(e){return e.id===r})))&&void 0!==e?e:null}),[t,r]);return{sceneConfig:t,selectedEntity:o,createEntity:function(){var e={id:Object(f.v4)(),name:"New Entity",children:[],components:{}};n([].concat(Object(P.a)(t.entities),[e]))},selectEntity:function(e){s(e!==r?e:"")},updateEntity:function(e){console.debug("Called update entity",e);var i=t.entities.findIndex((function(t){return t.id===e.id}));-1===i&&console.error("Couldn't find "+e.id+" in sceneConfig.entities"),t.entities[i]=e,n(t.entities)},updateEntityParent:function(e,t){}}},z=function(){var e=Object(i.useContext)(j);return{scripts:e.scripts,setScripts:e.setScripts,loadScript:function(e){},saveScript:function(e){},createScript:function(e){}}},U=function(){var e=z().scripts,t=I().sceneConfig,n=Object(i.useContext)(u).renderElement,r=Object(i.useState)(N.isRunning),s=Object(d.a)(r,2),o=s[0],c=s[1];Object(i.useEffect)((function(){return a()}),[n]);var a=function(){n&&n.current&&N.Initialize(n.current)};return{renderElement:n,isRunning:o,toggleRun:function(){if(n&&n.current){if(N.isRunning)return console.debug("stopping scene"),N.Stop(),void c(!1);console.debug("Going to run scene...");var i={sceneConfig:t,scripts:e};console.debug("Made payload:",i),N.Run(i),c(!0)}}}},A=n(27),B=n(7);function D(){var e=I(),t=e.selectedEntity,n=e.updateEntity,r=function(e,t){return"".concat(e,"--").concat(t)},s=Object(A.c)((function(){if(!t)return{};var e=t.components,n=Object.entries(e).map((function(e){var t=Object(d.a)(e,2),n=t[0],i=t[1],s=Object.fromEntries(Object.entries(i).map((function(e){var t=Object(d.a)(e,2),i=t[0],s=t[1];return[r(n,i),{value:s,label:i}]})));return[n,Object(A.b)(s)]}));return Object.fromEntries(n)}),[t]),o=Object(d.a)(s,2),a=o[0],u=o[1];return Object(i.useEffect)((function(){t&&function(e){var t={};Object.entries(e.components).forEach((function(e){var n=Object(d.a)(e,2),i=n[0],s=n[1],o=Object(d.a)(Object.entries(s)[0],2),c=o[0],a=o[1];t[r(i,c)]=a})),console.debug("setting",t),u(t)}(t)}),[t,u]),Object(i.useEffect)((function(){t&&function(e,t){var i,r=function(e){var t={};return Object.entries(e).forEach((function(e){var n=e,i=Object(d.a)(n,2),r=i[0],s=i[1],o=r.split("--"),c=Object(d.a)(o,2),a=c[0],u=c[1];t[a]?t[a][u]=s:t[a]=Object(B.a)({},u,s)})),t}(t);if(JSON.stringify(r)!==JSON.stringify(e.components)){var s=(i=e,JSON.parse(JSON.stringify(i)));s.components=r,n(s)}}(t,a)}),[a,t]),Object(c.jsx)("div",{className:"bg-indigo-500 space-y-1",children:Object(c.jsx)(A.a,{fill:!0,flat:!0,titleBar:!1})})}function J(e){var t,n=e.entity,r=I(),s=r.selectedEntity,o=r.selectEntity,a=Object(i.useMemo)((function(){return(null===s||void 0===s?void 0:s.id)===n.id}),[s,n.id]);return Object(c.jsx)("div",{className:"\n    p-2\n    rounded-md\n    transition\n    cursor-pointer\n    ".concat(a?"hover:bg-indigo-500":"hover:bg-indigo-400","\n    ").concat(a&&"bg-indigo-300"),onClick:function(e){e.stopPropagation(),o(n.id)},children:Object(c.jsx)("h1",{children:null!==(t=null===n||void 0===n?void 0:n.name)&&void 0!==t?t:"__ENTITY__"})})}function L(){var e=I().sceneConfig;return Object(c.jsx)("div",{className:"bg-indigo-200 p-1.5 space-y-1",children:e.entities.map((function(e){return Object(c.jsx)(J,{entity:e},e.id)}))})}function V(){var e=I().createEntity,t=U(),n=t.renderElement,i=t.toggleRun,r=t.isRunning;return Object(c.jsxs)("main",{className:"w-screen h-screen overflow-hidden",children:[Object(c.jsx)("div",{className:"h-2 transition bg-red-400 ".concat(r&&"bg-green-400")}),Object(c.jsxs)("nav",{className:"bg-gray-900 p-2 space-x-2",children:[Object(c.jsxs)("button",{onClick:i,className:"p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600",children:[r?"Stop":"Run"," Scene"]}),Object(c.jsx)("button",{onClick:e,className:"p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600",children:"Add Entity"})]}),Object(c.jsxs)("section",{className:"w-full h-full grid",style:{gridTemplateColumns:"1fr 17rem"},children:[n&&Object(c.jsx)("div",{className:"bg-gray-600",id:"scene",ref:n}),Object(c.jsxs)("div",{className:"grid grid-rows-2 gap-0 5",children:[Object(c.jsx)(L,{}),Object(c.jsx)(D,{})]})]})]})}var W=function(){return Object(c.jsx)(p,{children:Object(c.jsx)(g,{children:Object(c.jsx)(l,{children:Object(c.jsx)(V,{})})})})};o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(W,{})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.aaa95334.chunk.js.map