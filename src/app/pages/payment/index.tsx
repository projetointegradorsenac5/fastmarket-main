import { Image, TouchableOpacity, View } from 'react-native';
import { ViewContainer, ViewContainerSecondary } from '../../styled-components/view';

import { BasePage } from '../base-page';
import { ParagraphBold, ParagraphSemibold } from '../../styled-components/text';
import React from 'react';
import { globalStyles } from '../../global-styles';
import useDeviceTheme from '../../theme/use-theme';
import { usePaymentContext } from '../../contexts/payment-context';
import { useProductContext } from '../../contexts/product-context';
import { useRoute } from '@react-navigation/native';
import { CartItem } from '../../store/cart/initialState';
import colors from 'tailwindcss/colors';

type PaymentMethod = {
  method: string,
  description: string,
  img: string,
  action: any,
}

interface PaymentMethodProps {
  paymentMethod: PaymentMethod,
}

const PaymentMethod = ({ paymentMethod }: PaymentMethodProps) => {
  return (
    <TouchableOpacity className='flex flex-row justify-between items-center p-4'
      onPress={
        () => paymentMethod.action()
      }
    >
      <ParagraphBold>{paymentMethod.description}</ParagraphBold>
      <Image source={{ uri: paymentMethod.img }} className='w-10' style={{ aspectRatio: '1/1' }} />
    </TouchableOpacity>
  )
}

const PaymentMethods = () => {
  const productContext = useProductContext();
  const paymentContext = usePaymentContext();
  const { theme } = useDeviceTheme()

  const paymentMethods: PaymentMethod[] = [
    {
      method: 'credit_card',
      description: 'Cartão de crédito',
      img: 'https://cdn-icons-png.flaticon.com/256/5163/5163845.png',
      action: () => {
        paymentContext.onCheckout()
      }
    },
    // {
    //   method: 'pix',
    //   description: 'Pix',
    //   img: 'https://logospng.org/download/pix/logo-pix-icone-256.png',
    //   action: () => {
    //     productContext.showToast('success', 'PIX', `executando a função do PIX ${}`);
    //   }
    // },
  ]

  return (
    <>
      <ParagraphBold style={{ paddingVertical: 6 }}>Selecione o Método de Pagamento</ParagraphBold>
      <View className="flex gap-1">
        {paymentMethods.map((item: any, index: number) => (
          <ViewContainerSecondary key={index} style={[
            globalStyles.roundedHidden,
            {
              marginBottom: 3,
              borderWidth: 1,
              borderColor: theme.borderColor,
            },
          ]}>
            <PaymentMethod paymentMethod={item} />
          </ViewContainerSecondary>
        ))
        }
      </View>
    </>
  );
}

export default function Payment() {
  const { params } = useRoute();
  const { theme } = useDeviceTheme();
  const { cart, total } = params;
  const { formatToCurrency } = useProductContext();

  return (
    <BasePage style={{ paddingTop: 8 }} children={
      <>
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
          <View className='p-2'>
            {cart.map((produto: CartItem, index: number) => {
              const total = formatToCurrency(produto.quantity! * produto.unit_price!)
              return (
                <View
                  className='border-b border-dashed gap-2'
                  style={{ borderColor: theme.secondaryColor }}
                  key={index}
                >
                  <ParagraphSemibold>{produto.description}</ParagraphSemibold>
                  <View className='flex flex-row justify-between pb-1'>
                    <ParagraphBold>{`${produto.quantity} * ${produto.unit_price}`}</ParagraphBold>
                    <ParagraphBold>{`${total}`}</ParagraphBold>
                  </View>
                </View>
              )
            })}
          </View>
          <View className='flex flex-row justify-between p-2'>
            <ParagraphBold>TOTAL:</ParagraphBold>
            <ParagraphBold style={{ color: colors.green[600] }}>R$ {total}</ParagraphBold>
          </View>
        </ViewContainer>
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
          <PaymentMethods />
        </ViewContainer>
      </>
    } />
  );
}