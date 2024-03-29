import axios from "axios";
import { client } from "../utils/client";
import { uid } from "uid";
export const AliExpressProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by date

export const getMyProducts = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(_createdAt desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get SinglePost

export const getSingleProduct = async (postId) => {
  try {
    const query = `*[_type == "product" && _id == "${postId}"][0]`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by price

export const getMyProductsSortedByPrice = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(price desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get New Products

export const getProducts = async () => {
  try {
    const query = `*[_type == "product"]| order(_createdAt desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Products sorted By Price

export const getProductsSortedByPrice = async () => {
  try {
    const query = `*[_type == "product"]| order(price desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get users sorted By date

export const getUsers = async () => {
  try {
    const query = `*[_type == "user"]| order(_createdAt desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Single User

export const getSingleUser = async (userId) => {
  try {
    const query = `*[_type == "user" && subId =="${userId}"][0]`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//Product evaluation calculate

export const evaluationCalculate = async (productId) => {
  const query = `*[_type == "product" && _id == "${productId}"][0]`;
  const res = await client.fetch(query);

  let num = 0;

  for (let i = 0; i < res.comments?.length; i++) {
    num += parseInt(res.comments[i].star);
  }
  let calcEvaluation = num / res.comments.length;
  if (num === 0 && res.comments.length === 0) {
    calcEvaluation = 0;
  }
  return calcEvaluation.toFixed(2);
};
//Get My Producst Rate
export const evaluationAllCalculate = async (productId) => {
  const query = `*[_type == "product" && sellingBy._ref == "${productId}"]`;
  const res = await client.fetch(query);
  let num = 0;

  const array = [];
  for (let i = 0; i < res.length; i++) {
    for (let p = 0; p < res[i].comments?.length; p++) {
      if (res[i].comments[p]?.star === 0) {
      } else {
        num += parseInt(res[i].comments[p].star);
      }
    }
    const newObject = { num, res: res[i] };
    array.push(newObject);
    num = 0;
  }
  array.sort((a, b) => b.num - a.num);
  const response = [];
  for (let i = 0; i < array.length; i++) {
    response.push(array[i].res);
  }

  return response;
};

//Get My Products sorted by price lowest

export const getMyProductsSortedByPriceLowest = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(price desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by price highest

export const getMyProductsSortedByHighest = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(price asc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by price rated

export const getMyProductsSortedByRate = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(comments.star asc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Add basket

export const addBasket = async (userId, productId, amount) => {
  try {
    const userQuery = `*[_type == "user" && subId == "${userId}"][0]`;
    const user = await client.fetch(userQuery);

    const productQuery = `*[_type == "product" && _id == "${productId}"][0]`;
    const product = await client.fetch(productQuery);
    console.log(user);
    if (user.basket.find((i) => i.product._id === product._id)) {
      const findProduct = await user.basket.find(
        (i) => i.product._id === product._id
      );
      const updatedProduct = {
        _key: findProduct._key,
        amount: findProduct.amount + amount,
        product: findProduct.product,
      };
      const filteredBasket = await user.basket.filter(
        (i) => i.product._id !== product._id
      );
      const newBasketList = [...filteredBasket, updatedProduct];
      await client.patch(userId).set({ basket: newBasketList }).commit();
    } else {
      const newProduct = {
        _key: uid(),
        amount: amount,
        product: product,
      };
      const newBasketList = [...user.basket, newProduct];

      await client.patch(userId).set({ basket: newBasketList }).commit();
    }
  } catch (error) {
    console.log(error);
  }
};
//Get My Basket
export const calcMaxAmount = async (userId, productId, maxAmount) => {
  try {
    const userQuery = `*[_type == "user" && subId == "${userId}"][0]`;
    const user = await client.fetch(userQuery);

    if (user.basket.find((i) => i.product._id === productId)) {
      const num = await user.basket.find((i) => i.product._id === productId);

      const result = maxAmount - num.amount;

      return result;
    } else {
      return maxAmount;
    }
  } catch (error) {
    console.log(error);
  }
};
//Delete Product from basket
export const deleteProductFromBasket = async (userId, productId) => {
  try {
    const userQuery = `*[_type == "user" && subId == "${userId}"][0]`;
    const user = await client.fetch(userQuery);

    const newBasket = await user.basket.filter(
      (i) => i.product._id !== productId
    );

    const res = await client.patch(userId).set({ basket: newBasket }).commit();
    return res.basket;
  } catch (error) {
    console.log(error);
  }
};

//Buy Basket
//Buy Basket
export const buyBasket = async (userId) => {
  try {
    const userQuery = `*[_type == "user" && subId == "${userId}"][0]`;
    const user = await client.fetch(userQuery);

    for (let i = 0; i < user.basket.length; i++) {
      const productQuery = `*[_type == "product" && _id == "${user.basket[i].product._id}"][0]`;
      const product = await client.fetch(productQuery);
      const newStock = product.stock - user.basket[i].amount;

      await client
        .patch(user.basket[i].product._id)
        .set({
          stock: newStock,
        })
        .commit();
    }

    for (let i = 0; i < user.basket.length; i++) {
      const updatedUserQuery = `*[_type == "user" && subId == "${userId}"][0]`;
      const updatedUser = await client.fetch(updatedUserQuery);
      const basketItem = {
        amount: updatedUser.basket[i].amount,
        product: updatedUser.basket[i].product,
        _key: updatedUser.basket[i]._key,
        date: new Date(),
      };

      await client
        .patch(userId)
        .set({ buymentStory: [...updatedUser.buymentStory, basketItem] })
        .commit();
    }

    await client.patch(userId).set({ basket: [] }).commit();
  } catch (error) {
    console.log(error);
  }
};
//Leave a Comment
export const leaveAComment = async (productId, comment) => {
  try {
    const productQuery = `*[_type == "product" && _id == "${productId}"][0]`;
    const product = await client.fetch(productQuery);

    await client
      .patch(productId)
      .set({ comments: [...product.comments, comment] })
      .commit();
  } catch (error) {
    console.log(error);
  }
};
//Search
export const searchProduct = async (searchQuery, sortQuery) => {
  try {
    const productQuery = `*[_type == "product" && [topic,caption,brand] match "*${searchQuery}*"]| order(${sortQuery})`;
    const product = await client.fetch(productQuery);

    return product;
  } catch (error) {
    console.log(error);
  }
};
