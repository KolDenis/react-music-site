import React, { useEffect } from 'react';
import './App.scss';
import Player from './components/Player';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { publicRoutes } from './routes';
import Footer from './components/Footer';
import Menu from './components/Menu';

const mus = { id: 1, name: "Без Тебе Мене Нема", fileName: "audio/def/Океан Ельзи - Без Тебе Мене Нема.mp3", creator: 1 }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="body">
          <div className="bodyChild">
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.page/>}/>
              ))}
            </Routes>
          </div>
          <div className="bodyMenu">
            <Menu></Menu>
          </div>
        </div>
        <Footer></Footer>
        <div style={{'height': '60px'}}></div>
        <Player/>
      </BrowserRouter>
    </div>
  );
}

export default App;
