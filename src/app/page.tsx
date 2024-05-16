'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import notify from '@/utils/notify';
import { ProductType } from '@/types/products';

const loadProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('unable to fetch products');

  return (await res.json().then((res) => res.data)) as ProductType[];
};

export default function App() {
  const session = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch(() => notify('Error', 'Unable to retrieve products'));
  }, []);
  return (
    <main className='h-full'>
      <h1 className='font-bold text-2xl mb-5'>Welcome</h1>
      {session.status === 'authenticated' ? (
        <Link href='/admin'>Admin</Link>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </main>
  );
}
