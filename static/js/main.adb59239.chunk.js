(this["webpackJsonpbrowser-engine"]=this["webpackJsonpbrowser-engine"]||[]).push([[0],{34:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(15),s=n.n(c),a=(n(34),n(6)),o={},u=Object(i.createContext)(o),l=function(e){var t=e.children,n={renderElement:Object(i.useRef)(null)};return Object(a.jsx)(u.Provider,{value:n,children:t})},d=n(3),h=n(9),f=n(16),b={sceneConfig:{entities:[],camera:{position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}},selectedEntity:null,setEntities:function(e){},setSelectedEntity:function(e){},setCameraProps:function(e){}},m=Object(i.createContext)(b),v=function(e){var t=e.children,n=Object(i.useState)({position:new h.Vector3,fov:70,near:.1,far:1e3,controls:"orbit"}),r=Object(d.a)(n,2),c=r[0],s=r[1],o=Object(i.useState)([{id:Object(f.v4)(),name:"Entity A",material:new h.MeshNormalMaterial,geometry:new h.BoxBufferGeometry,children:[],components:{}}]),u=Object(d.a)(o,2),l=u[0],b=u[1],v=Object(i.useState)(null),j=Object(d.a)(v,2),p={sceneConfig:{entities:l,camera:c},setEntities:b,setCameraProps:s,selectedEntity:j[0],setSelectedEntity:j[1]};return Object(a.jsx)(m.Provider,{value:p,children:t})},j={scripts:[],setScripts:function(e){}},p=Object(i.createContext)(j),g=function(e){var t=e.children,n=Object(i.useState)([]),r=Object(d.a)(n,2),c={scripts:r[0],setScripts:r[1]};return Object(a.jsx)(p.Provider,{value:c,children:t})},y=n(1),O=n(2),E=n(26),C=n.n(E)()(h),x=function(){function e(){var t=this;if(Object(y.a)(this,e),this.renderer=new h.WebGLRenderer({antialias:!0}),this.renderElement=void 0,this.fov=45,this.near=.01,this.far=2e4,this.camera=void 0,this.controls=void 0,e.instance)return e.instance;e.instance=this,this._setCamera(),window.addEventListener("resize",(function(){return t.handleResize()}))}return Object(O.a)(e,[{key:"setup",value:function(e,t){this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderElement=e,this.renderElement.appendChild(this.renderer.domElement),this.handleResize(),this._setControls(),this._runSceneLoop(t)}},{key:"_setCamera",value:function(){this.renderElement||(this.camera=new h.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.near,this.far))}},{key:"_runSceneLoop",value:function(e){var t=this;this.renderer.setAnimationLoop((function(n){return t.Update(e)}))}},{key:"_setControls",value:function(){this.controls=new C(this.camera,this.renderer.domElement),this.controls.autoRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.39,this.camera.position.z=200,this.controls.update()}},{key:"handleResize",value:function(){this.renderElement&&(this.camera.aspect=this.renderElement.clientWidth/this.renderElement.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.renderElement.clientWidth,this.renderElement.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio))}},{key:"Update",value:function(e){this.controls.update(),this.renderer.render(e,this.camera),S.UpdateScene()}}]),e}();x.instance=void 0;var w=function(){function e(t){var n,i,r=this;Object(y.a)(this,e),this.name="",this.mesh=void 0,this._id=Object(f.v4)(),this.children=[],this.components=void 0;var c=null!==(n=t.material)&&void 0!==n?n:new h.MeshBasicMaterial,s=null!==(i=t.geometry)&&void 0!==i?i:new h.BoxBufferGeometry;this.mesh=new h.Mesh(s,c),t.children.forEach((function(e){var t=S.CreateEntity(e,r);r.addChild(t)})),this.components={}}return Object(O.a)(e,[{key:"addChild",value:function(e){}},{key:"addComponent",value:function(e,t){}},{key:"getProps",value:function(){return{}}},{key:"Update",value:function(){console.debug("calling update on entity",this._id)}}]),e}(),S=function(){function e(){Object(y.a)(this,e),e.instance||(e.instance=this)}return Object(O.a)(e,null,[{key:"CreateEntity",value:function(t,n){var i=new w(t);return n&&n.addChild(i),e._entities.push(i),this._scene.add(i.mesh),i}},{key:"Initialize",value:function(e){this.cameraManager||(this.cameraManager=new x),this.cameraManager.setup(e,this._scene)}},{key:"UpdateScene",value:function(){e._entities.forEach((function(e){e.Update()}))}},{key:"CreateComponent",value:function(e,t){}},{key:"Run",value:function(t,n){console.debug("called SceneManager.Run()",t,n),t.sceneConfig.entities.forEach((function(t){e.CreateEntity(t)}))}},{key:"Stop",value:function(){}}]),e}();S.instance=void 0,S.isRunning=!1,S._scene=new h.Scene,S._entities=[],S._components={},S.cameraManager=x.instance;var k=n(10),_=function(){var e=Object(i.useContext)(m),t=e.sceneConfig,n=e.setEntities,r=e.selectedEntity,c=e.setSelectedEntity;return{sceneConfig:t,selectedEntity:r,createEntity:function(){var e={id:Object(f.v4)(),name:"New Entity",children:[],components:{}};n([].concat(Object(k.a)(t.entities),[e]))},selectEntity:function(e){c(e)},updateEntity:function(e){},updateEntityParent:function(e,t){}}},R=function(){var e=Object(i.useContext)(p);return{scripts:e.scripts,setScripts:e.setScripts,loadScript:function(e){},saveScript:function(e){},createScript:function(e){}}},M=function(){var e=R().scripts,t=_().sceneConfig,n=Object(i.useContext)(u).renderElement;Object(i.useEffect)((function(){return r()}),[n]);var r=function(){n&&n.current&&(console.debug("ran init!"),S.Initialize(n.current))};return{renderElement:n,isRunning:S.isRunning,toggleRun:function(){if(n&&n.current){if(S.isRunning)return console.debug("stopping scene"),void S.Stop();console.debug("Going to run scene...");var i={sceneConfig:t,scripts:e};console.debug("Made payload:",i),S.Run(i,n.current)}}}},N=n(5),P=n(29);function z(){var e=_(),t=e.sceneConfig,n=e.selectedEntity,r=Object(i.useMemo)((function(){var e=t.entities.flatMap((function(e){return e.id===n&&e}));return e.length<1?null:e[0]||null}),[]),c=Object(i.useCallback)((function(){if(!r)return{}}),[r]),s=Object(P.a)((function(){return Object(N.a)({},c())}),[r]);return Object(i.useEffect)((function(){r&&Object.entries(s[0])}),[s]),Object(a.jsx)(a.Fragment,{})}function B(e){var t,n=e.entity,i=_(),r=i.selectedEntity,c=i.selectEntity,s=r===n.id;return Object(a.jsx)("div",{className:"\n    p-1\n    rounded-md\n    transition\n    cursor-pointer\n    hover:bg-red-400\n    ".concat(s&&"bg-red-300"),onClick:function(){return c(s?"":n.id)},children:null!==(t=null===n||void 0===n?void 0:n.name)&&void 0!==t?t:"__ENTITY__"})}function U(){var e=_().sceneConfig;return Object(a.jsx)("div",{className:"bg-red-500 p-1.5 space-y-1",children:e.entities.map((function(e){return Object(a.jsx)(B,{entity:e},e.id)}))})}function L(){var e=_(),t=e.createEntity,n=e.selectedEntity,i=M(),r=i.renderElement,c=i.toggleRun;return Object(a.jsxs)("main",{className:"w-screen h-screen overflow-hidden",children:[Object(a.jsxs)("nav",{className:"bg-gray-900 p-2 space-x-2",children:[Object(a.jsx)("button",{onClick:c,className:"p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600",children:"Run Scene"}),Object(a.jsx)("button",{onClick:t,className:"p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600",children:"Add Entity"})]}),Object(a.jsxs)("section",{className:"w-full h-full grid",style:{gridTemplateColumns:"1fr 14rem"},children:[r&&Object(a.jsx)("div",{className:"bg-gray-600",id:"scene",ref:r}),Object(a.jsx)(U,{})]}),n&&Object(a.jsx)(z,{})]})}var W=function(){return Object(a.jsx)(v,{children:Object(a.jsx)(g,{children:Object(a.jsx)(l,{children:Object(a.jsx)(L,{})})})})};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(W,{})}),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.adb59239.chunk.js.map