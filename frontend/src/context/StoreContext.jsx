import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const url = "http://localhost:4000";

    const [product, setProduct] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productID, setProductId] = useState({});
    const [title_category, setTitle_category] = useState({});
    const [cartItems, setCartItems] = useState({});
    
    const getProduct = async () => {
        try {
            const res = await fetch(`${url}/api/product/getAllProducts`);
            const data = await res.json();
            setProduct(data.data);
        } catch (err) {
            console.log(err);
        }
    };
   
    const getCategorybyId = async (id) => {
        try {
          const res = await fetch(`${url}/api/category/getCategoryId/${id}`);
          const data = await res.json();
          return data.data.title_category;
        } catch (err) {
          console.log(err);
          return null;
        }
      };
    
      const fetchCategoriesForProducts = async (products) => {
        const categoriesMap = {};
        for (const product of products) {
          const categoryTitle = await getCategorybyId(product.category_id);
          categoriesMap[product.category_id] = categoryTitle;
        }
        setTitle_category(categoriesMap);
      };

      const getProductByCategory = async (categoryId) => {
        try {
            const response = await fetch(`${url}/api/product/getProductsByCategoryId/${categoryId}`);
            const data = await response.json();
            if (data.success) {
                setFilteredProducts(data.data); 
            } else {
                setFilteredProducts([]);
            }
        } catch (err) {
            console.log(err);
            setFilteredProducts([]); 
        }
    };

    const getProductById = async (productId) => {
      try {
        const res = await fetch(`${url}/api/product/getProductById/${productId}`);
        const data = await res.json();
        setProductId(data.data);
      } catch (err) {
          console.log(err);
      }
    };


    // for cart page
    const addToCart = (itemId) => {
      setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1
      }));
  };


    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) - 1
      }));
  };



    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        if (product.length > 0) {
          fetchCategoriesForProducts(product);
        }
      }, [product]);

    const contextValue ={
        url,
        product,
        productID,
        getProductByCategory,
        getProductById,
        filteredProducts,
        title_category,
        addToCart,
        removeFromCart,
        cartItems,
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
