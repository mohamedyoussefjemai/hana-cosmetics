import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useGlobalContext } from '../../context/GlobalContext';

import Categories from '../../categories'
import { CategoryGlobalProvider } from '../../context/categoryContext';
import { SubCategoryGlobalProvider } from '../../context/subCategoryContext';
import { ProductGlobalProvider } from '../../context/productContext';
import { ActivityGlobalProvider } from '../../context/activityContext';
import {ShopGlobalProvider } from '../../context/shopContext';
import {SocialGlobalProvider } from '../../context/socialContext';
import {HomepageGlobalProvider } from '../../context/homepageContext';
import {FooterGlobalProvider } from '../../context/footerContext';
import SubCategories from '../../sub-categories'
import Products from '../../products'
import Activities from '../../activities'
import Shops from '../../shops'
import Socials from '../../socials'
import Homepage from '../../homepage'
import Footer from '../../footer'
import AuthBox from '../../auth';
import Dashboard from '../../dashboard';

export default function Layout2() {
  const { fetchingUser, user }= useGlobalContext()
  return fetchingUser ? (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  ) : (
    <BrowserRouter>
    <Routes>

    <Route exact path='/' element={  <AuthBox/>}></Route>
    
    <Route exact path='/dashboard' element={
        <Dashboard user={user}/>}></Route>
    
    <Route exact path='/categories' element={    <CategoryGlobalProvider>< Categories user={user} /></CategoryGlobalProvider>}></Route>
                 <Route exact path='/sub-categories' element={<SubCategoryGlobalProvider>< SubCategories user={user} /></SubCategoryGlobalProvider>}></Route>
                 <Route exact path='/products' element={<ProductGlobalProvider>< Products user={user} /></ProductGlobalProvider>}></Route>
                 <Route exact path='/activities' element={<ActivityGlobalProvider>< Activities user={user} /></ActivityGlobalProvider>}></Route>
                 <Route exact path='/shops' element={<ShopGlobalProvider>< Shops user={user} /></ShopGlobalProvider>}></Route>
                 <Route exact path='/socials' element={<SocialGlobalProvider>< Socials user={user} /></SocialGlobalProvider>}></Route>
                 <Route exact path='/homepage' element={<HomepageGlobalProvider>< Homepage user={user} /></HomepageGlobalProvider>}></Route>
                 <Route exact path='/footer' element={<FooterGlobalProvider>< Footer user={user} /></FooterGlobalProvider>}></Route>

    </Routes> 
    </BrowserRouter>
  )};