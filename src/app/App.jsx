import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { About } from '../components/About/About';
import { Root } from './Root';

function App() {
  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path ='/' element={<Root></Root>}>
      <Route path='about' element={<About></About>}></Route>
    </Route>
  ));
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
