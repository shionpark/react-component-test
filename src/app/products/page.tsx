import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: '샘플 상품',
    price: 0,
    description: '네트워크 실패 시 사용되는 샘플 데이터입니다.',
    category: 'sample',
    image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  },
];

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = (await response.json()) as Product[];

    return Array.isArray(products) && products.length > 0
      ? products
      : FALLBACK_PRODUCTS;
  } catch (error) {
    console.error('Error while fetching products, using fallback data.', error);
    return FALLBACK_PRODUCTS;
  }
}

export default async function ProductsPage() {
  const productsData = await fetchProducts();
  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {productsData.map((product: Product) => (
          <Link
            className="w-64 h-auto border"
            key={product.id}
            href={`/products/${product.id}`}
            data-testid={`product-${product.id}`}
            data-product-id={product.id}
          >
            <li>
              <img className="w-full" src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.price}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
