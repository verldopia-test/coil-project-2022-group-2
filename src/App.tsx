import { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Drawer from '@mui/material/Drawer';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Item from './item/item';
import Cart from './components/Cart/Cart';
//Styles
import { Wrapper, StyledButton } from './App.styles';
import './assets/css/reset.css';
import './App.css';

import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ContactPage from './pages/Contact';
import WishlistPage from './pages/Wishlist';
import LayoutComponent from './components/layouts/Layout';
import Footer from './components/Footer/Footer';

// Types
export type CartItemType = {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

    console.log('hello?');
    const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);
    const handleAddCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            const itemAlreadyInCart = prev.find((item) => item.id === clickedItem.id);
            if (itemAlreadyInCart) {
                return prev.map((item) => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
            }
            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };
    const handleRemoveCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <p>'Someting went wrong'</p>;

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="contact">
                    <Route index element={<ContactPage />} />
                    <Route path=":number" element={<ContactPage />} />
                </Route>
                <Route path="layout" element={<LayoutComponent />}>
                    <Route index element={<ContactPage />} />
                    <Route path=":number" element={<ContactPage />} />
                </Route>
                <Route path="wishlist" element={<WishlistPage />} />
            </Routes>
            <Footer />
        </>
        // <>
        //   <Header />
        //   <Wrapper>
        //     <Drawer
        //       anchor="right"
        //       open={cartOpen}
        //       onClose={() => setCartOpen(false)}
        //     >
        //       <Cart
        //         cartItems={cartItems}
        //         addToCart={handleAddCart}
        //         removeFromCart={handleRemoveCart}
        //       />
        //     </Drawer>
        //     <StyledButton onClick={() => setCartOpen(true)}>
        //       <Badge
        //         badgeContent={getTotalItems(cartItems)}
        //         color="error"
        //       >
        //         <ShoppingCartOutlinedIcon />
        //       </Badge>
        //     </StyledButton>
        //     <Grid container spacing={2}>
        //       {data?.map((item) => (
        //         <Grid item key={item.id} xs={12} sm={6} xl={3}>
        //           <Item item={item} handleAddCart={handleAddCart} />
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Wrapper>
        // </>
    );
}

export default App;
