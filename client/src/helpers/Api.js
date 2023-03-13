import axios from "axios"
export const AliExpressProducts = ()=>{
    try {
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>console.log(res))
    } catch (error) {
        console.log(error);
    }
}