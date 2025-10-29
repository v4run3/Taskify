import React, { use } from "react";
import { Routes, Route, Router, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import DashBoard from "./pages/Admin/DashBoard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

import UserDashBoard from "./pages/User/UserDashBoard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

import PrivateRoute from "./routes/PrivateRoute";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
    <div> 
      <Router>
        <Routes>  
          {/* Default route */}
          <Route path="/" element={<div>Home Page</div>} />

          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashBoard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard"  /> : <Navigate to="/user/dashboard"  />;
};
