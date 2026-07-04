import {useGetTopProductsQuery} from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import ProductCarousel from "../pages/Products/ProductCarousel.jsx";

function Header() {
    const {data, isLoading, error} = useGetTopProductsQuery();
    
    if(isLoading){
        return <Loader/>
    }

    if(error){
        return <h1>Error</h1>
    }

    return <>
        <div className="flex justify-around">
            <div className="xl:block lg:block md:hidden sm:hidden">
                <div className="grid grid-cols-2">
                    {data.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel/>
        </div>
    </> ;
}

export default Header;