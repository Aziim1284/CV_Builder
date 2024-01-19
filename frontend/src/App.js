import React,{Suspense,lazy} from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/Navigations/PageNotFound';
import Edit from '././components/UserView/Edit';
import CvPreview from './components/Templates/Template1';
const Home=lazy(()=>import('././components/UserView/Home'))
const Signup=lazy(()=>import('./Auth/Signup'))
const Login=lazy(()=>import('./Auth/Login'))
const Dashboard=lazy(()=>import('./components/UserView/Dashboard'))
const Profile=lazy(()=>import('./components/UserView/Profile'))
const Preview=lazy(()=>import('./components/UserView//Preview'))
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><img src='./Images/loading.gif'/></div>}>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/preview" element={<Preview />} />
     <Route path="/edit" element={<Edit />} />
     <Route path="*" element={<PageNotFound/>} />
     <Route path="/cvpreview" element={<CvPreview/>} />
     </Routes>
     </BrowserRouter>
     </Suspense>
    </div>
  );
}

export default App;
