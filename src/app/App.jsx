import React, { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { About } from '../components/About/About';
import { LogIn } from '../components/Auth/LogIn';
import { Root } from './Root';

function App() {

  const appRouter = createBrowserRouter(createRoutesFromElements([
    <Route path ='/' element={<Root />}></Route>,
    <Route path='/login' element={<LogIn />}></Route>,
    <Route path='/about' element={<About />}></Route>
  ]));
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
