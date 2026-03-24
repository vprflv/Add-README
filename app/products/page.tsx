import {ProductsPage} from "@/components/products/ProductsPage";
import {SearchForm} from "@/components/search/searchForm";

export default function productPage(){

    return (<div>
        <div><SearchForm/></div>
        <div><ProductsPage/></div>
    </div>)
}