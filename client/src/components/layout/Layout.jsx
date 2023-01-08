import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';  

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
import FrontPage from '../frontPage/FrontPage';

export default function Layout() {
  return (
    
      <Router>  
      <Routes>  
                 <Route exact path='/' element={    < FrontPage />}></Route>
                 <Route exact path='/categories' element={    <CategoryGlobalProvider>< Categories /></CategoryGlobalProvider>}></Route>
                 <Route exact path='/sub-categories' element={<SubCategoryGlobalProvider>< SubCategories /></SubCategoryGlobalProvider>}></Route>
                 <Route exact path='/products' element={<ProductGlobalProvider>< Products /></ProductGlobalProvider>}></Route>
                 <Route exact path='/activities' element={<ActivityGlobalProvider>< Activities /></ActivityGlobalProvider>}></Route>
                 <Route exact path='/shops' element={<ShopGlobalProvider>< Shops /></ShopGlobalProvider>}></Route>
                 <Route exact path='/socials' element={<SocialGlobalProvider>< Socials /></SocialGlobalProvider>}></Route>
                 <Route exact path='/homepage' element={<HomepageGlobalProvider>< Homepage /></HomepageGlobalProvider>}></Route>
                 <Route exact path='/footer' element={<FooterGlobalProvider>< Footer /></FooterGlobalProvider>}></Route>
                
          </Routes> 
      </Router>
     
  )
}
