import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './contexts/usePostProvider/usePostList';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Post from './components/Post';
import './App.css'



const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);


  return (
    <CategoriesProvider>
      <BrowserRouter>
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} setIsLoggedIn={setIsLoggedIn} />

          <Routes>
            <Route path="/" element={<Home category_id={''} content={''} title={''} post_img={''} showBtn={false} closeForm={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/LoginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/api/posts/:id" element={<Post title={''} content={''} item={''} id={''} />} />

          </Routes>
          <Footer />

        </div>
      </BrowserRouter>
    </CategoriesProvider>
  )
}

export default App

