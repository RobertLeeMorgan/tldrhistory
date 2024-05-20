import { QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { queryClient } from "./util/http";
import HomePage from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Post from "./routes/Post";
import Error from "./routes/Error";
import RootLayout from "./routes/Root";
import Edit from "./routes/Edit";
import User from "./routes/User";
import { YearProvider } from "./context/YearContext";
import { InteractionProvider } from "./context/InteractionContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ element }) {
  const { isAuth } = useAuth();
  return isAuth.token ? element : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/post", element: <ProtectedRoute element={<Post />} /> },
      { path: "/edit/:id", element: <ProtectedRoute element={<Edit />} /> },
      { path: "/user/:id", element: <User /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <YearProvider>
        <InteractionProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </InteractionProvider>
      </YearProvider>
    </AuthProvider>
  );
}

export default App;
