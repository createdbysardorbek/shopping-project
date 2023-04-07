import CartHeader from "../CartHeader";
import Product from "../Product";
import CartFooter from "../CartFooter";
import data from "./../../data";
import {useEffect, useState} from "react";

const Cart = () => {
    const [cart, setCart] = useState(data);
    const [total, setTotal] = useState({
        price: cart.reduce((previousValue, currentValue) => previousValue + currentValue.priceTotal, 0),
        count: cart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0)
    });

    useEffect(() => {
        setTotal({
            price: cart.reduce((previousValue, currentValue) => previousValue + currentValue.priceTotal, 0),
            count: cart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0)
        })
    }, [cart]);

    const deleteProduct = (id) => setCart(cart.filter(product => id !== product.id));

    const increase = (id) => {
        setCart((cart) => {
            return cart.map((product) => {
                let {count, price} = product
                if (product.id === id) {
                    return {
                        ...product, count: ++count, priceTotal: price * count
                    }
                }
                return product
            })
        });
    }

    const decrease = (id) => {
        setCart(cart.map((product) => {
            let {count, price} = product
            if (product.id === id) {
                return {
                    ...product, count: count > 1 ? --count : 1, priceTotal: price * count
                }
            }
            return product
        }))
    }

    const changeValue = (id, value) => {
        setCart(cart.map((product) => {
            if (product.id === id) {
                return {
                    ...product, count: value, priceTotal: product.price * value
                }
            }

            return product
        }))
    }

    const products = cart.map((product) => {
        return <Product
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            increase={increase}
            decrease={decrease}
            changeValue={changeValue}
        />;
    });

    return (<section className="cart">
        <CartHeader/>
        {products}
        <CartFooter total={total}/>
    </section>);
};

export default Cart;
