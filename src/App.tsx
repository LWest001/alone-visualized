import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Shell } from "./pages/Shell/Shell";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Shell />
    </MantineProvider>
  );
}
