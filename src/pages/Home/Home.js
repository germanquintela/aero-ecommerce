import React, {  } from 'react';
import Header from '../../components/Header';
import ProductSection from '../../components/ProductsSection';
import useFetch from '../../hooks/useFetch'
import {urlApi} from '../../utils/constants'
import Spinner from 'react-spinner-material';

import './Home.scss'
export default function Home(props) {

  const {userData, getProductsCart} = props
  const productsData = useFetch(`${urlApi}/products`, 'GET');
  
  return (
      <div className="homePage">
      {!userData.loading && 
          <Header userData={userData.result}/>
        }
        
        {(!productsData.loading && !userData.loading) ? 
          <ProductSection getProductsCart={getProductsCart} productsData={productsData} userData={userData.result} title='Electronics'/> :
          <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={true} className='spinner-home'/>
        }
      </div>
  );
}
