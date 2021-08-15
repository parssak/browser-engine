import { SceneProvider } from "./state/SceneContext";
import BrowserEngine from "./ui/base/BrowserEngine";

function App() {
  return (
    <SceneProvider>
      <BrowserEngine />
    </SceneProvider>
  );
}

export default App;
