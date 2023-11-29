import React from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CategoriesProvider } from './hooks/usePostListContext';
import Home from './components/Home'


const App: React.FC = () => {



  return (
    <CategoriesProvider>
      <BrowserRouter>
        <div className="App">

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </div>
      </BrowserRouter>
    </CategoriesProvider>
  )
}

export default App

