import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";
import PDFViewer from "./pages/PDFViewer";
import AdminDashboard  from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
      />
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route

    path="/login"

    element={<Login />}

/>

<Route

    path="/signup"

    element={<Signup />}

/>

<Route

    path="/create-room"

    element={

        <PrivateRoute>

            <CreateRoom />

        </PrivateRoute>

    }

/>
      <Route path="/join-room/:roomCode" element={<JoinRoom />}/>
<Route path="/room/:roomCode" element={<Room />}/>
      <Route path="/join-room" element={<JoinRoom />}/>
      <Route path="/pdf/:roomCode/:fileId" element={<PDFViewer />}/>
<Route
    path="/login"
    element={<Login />}
/>

<Route
    path="/signup"
    element={<Signup />}
/>
<Route

path="/admin"

element={<AdminDashboard />}

/>
<Route path="*" element={<ErrorPage />} />
</Routes>
    </>
  );
}

export default App;