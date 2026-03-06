import "./index.css"
import "./new_global.css"

import App from "./App"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>
)