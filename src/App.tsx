import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./components/Header/pages/Home/Home";
import Contacts from "./components/Header/pages/Contacts/Contacts";
import Admin from "./components/Header/pages/Admin/Admin";
import Basket from "./components/Header/pages/Basket/Basket";
import Section from "./components/Section/Section";
import { useEffect, useState } from "react";
import './App.css'
import Favorite from "./components/Header/pages/Favorite/Favorite";
import Detail from "./components/Header/pages/Detail/Detail";
import './components/i18n';
const App = () => {
  const [load , setload ] = useState(false)

  function loadData(){
setTimeout(() => {
  setload(!load)
}, 2000)
  }



  useEffect(() => {
    loadData()
  }, [])

  return !load ? (
    <div className='load'>
      <h1 className="storeLoad">iStore</h1>
      <img className="appleLoad" src='https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png'></img>
     
    </div> ) : (
    <div>
      <Header/>
      <Routes>
      <Route path="/" element={<Section/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
        <Route path="/product/:id" element={<Detail />} />

      </Routes>

    </div>
  );
};

export default App;