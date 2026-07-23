import { GameProvider } from "./contexts/GameContext";
import { AppContainer } from "./components/AppContainer";

export default function App() {
  return (
    <GameProvider>
      <AppContainer />
    </GameProvider>
  );
}
