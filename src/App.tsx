import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CategoriesProvider } from './hooks/usePostListContext';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import './App.css'



const App: React.FC = () => {

  return (
    <CategoriesProvider>
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home category_id={''} content={''} title={''} post_img={''} showBtn={false} closeForm={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              throw new Error('Function not implemented.');
            } }/> } />
            <Route path="/Projects" element={<Projects  /> } />
          </Routes>
          <Footer/>

        </div>
      </BrowserRouter>
    </CategoriesProvider>
  )
}

export default App

