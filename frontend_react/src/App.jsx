//here we will make our routes
// the path / is our home page
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';

import './App.css';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Create from './Pages/Posts/Create';
import Show from './Pages/Posts/Show';
import Update from './Pages/Posts/Update';


export default function App() {

  const{user}=useContext(AppContext);
  


  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element= {<Layout/>}> {/*the layout and home are components (like the views) in pages but the layout is the parent that means all the other pages will contain the header of layout but start their own content in the main tag*/}

         <Route index element={user ? <Home/>  : <Login/> } /> {/* that means that this route has the same path as the parent yaani eli mo7tawih houa lparent*/}

         <Route path='/create' element={ user ? <Create/> :<Login/> } />
         <Route path='/register' element={ user ? <Home/> :<Register/> } />
         <Route path='/login' element={ user ? <Home/> : <Login/> } />
         <Route path='/posts/:id' element={ user ? <Show/> : <Login/> } /> {/*  id is a dynamic parameter and we will be able to grab the id using this name*/}
         <Route path='/posts/update/:id' element={ user ? <Update/> : <Login/> } />
      </Route>
    </Routes>
      
    </BrowserRouter>
  )
}


