import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./layout/ProtectedRoute";
import About from "./pages/About";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <ProtectedRoute />,
					children: [
						{ path: "/", element: <Home /> },
						{ path: "/stats", element: <Stats /> },
					],
				},
				{ path: "/signin", element: <Signin /> },
				{ path: "/signup", element: <Signup /> },
				{ path: "/about", element: <About /> },
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
