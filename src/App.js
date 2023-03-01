import './App.css';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';
import About from './pages/About/About';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import EditPost from './pages/EditPost/EditPost';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login.js';
import Post from './pages/Post/Post';
import Register from './pages/Register/Register.js';
import Search from './pages/Search/Search';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth]);

  if (loadingUser) {
    return <p>Wait...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />} />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />} />
                <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />} />
             <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
