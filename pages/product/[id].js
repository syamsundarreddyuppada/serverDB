import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/common.module.css"
function productParams({result}) {
    const router = useRouter();
    // console.log("routeer",router,result);
    return (
        <div className={styles.flex_ac}>
            <Link href={"/"} >Back</Link>
            <Image src={result.thumbnail} alt={result.title} placeholder="blur" blurDataURL={result.thumbnail} width={200} height={200} />
            <div>
                <h3>result.title</h3>
                <h6>price : {result.price}</h6>
                <h6>rating : {result.rating}</h6>

                <h6>stock : {result.stock}</h6>

                <h6>category : {result.category}</h6>

                
            </div>
         </div> 
    );
}


export default productParams;

export async function getStaticPaths(ctx) {
    const response = await fetch('https://dummyjson.com/products')
    const result = await response.json()
    const params = result.products.map(item => {
        return {
            params: {
                id: `${item.id}`
            }

        }
    })


    return {
        paths:
            params,
        fallback: false


    }
}

export async function getStaticProps(content) {
    const {params} = content
    const response = await fetch(`https://dummyjson.com/products/${params.id}`)
    const result = await response.json()

    return {
        props: {
            result: result
        }
    }
}

// export async function getServerSideProps(content){
//     const {id} = content.query
//     const response = await fetch(`https://dummyjson.com/products/${id}`)
//     const result = await response.json()
//     console.log("result", result);

//     return {
//         props: {
//             result: result
//         }
//     }

// }