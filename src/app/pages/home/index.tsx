import React, { useEffect } from 'react';

import { BasePage } from '../base-page';
import FeaturedProducts from '../../components/products/featured-products/featured-products';
import { LastPurchase } from '../../components/home/last-purchase';
import { ViewContainer } from '../../styled-components/view';
import { globalStyles } from '../../global-styles';
import { reset } from '../../store/cart/actions'
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import Header from '../../components/home/header';

function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [])

  return (
    <BasePage children={
      <>
        <Header />
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
          <LastPurchase />
        </ViewContainer>
        <FeaturedProducts />
      </>
    } />
  );
}

export default Home;