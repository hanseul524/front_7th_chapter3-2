import { useCallback, useState } from "react";
import { Product } from "../../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  // 새 상품 추가
  const addProduct = useCallback((newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: `p${Date.now()}`
    };
    setProducts([...products, product]);
  }, []);

  // 상품 정보 수정
  const updateProduct = useCallback((productId: string, updates: Partial<Product>) => {
    setProducts(products.map(p =>
      p.id === productId
        ? {...p, ...updates}
        : p
    ));
  }, []);

  // 상품 삭제
  const deleteProduct = (productId: string) => {
    setProducts(products.filter(p =>
      p.id !== productId
    ));
  };

  // 재고 수정
  const updateProductStock = useCallback((productId:string, newStock: number) => {
    updateProduct(productId, { stock: newStock });
  }, [updateProduct]);

  // 할인 규칙 추가
  const addProductDiscount = useCallback((
    productId: string,
    discount: {
      quantity: number,
      rate: number
    }
  ) => {
    setProducts(products.map(p =>
      p.id === productId
      ? {...p, discounts: [...p.discounts, discount]}
      : p
    ));
  }, []);

  // 할인 규칙 삭제
  const removeProductDiscount = useCallback((productId: string, discountIndex: number) => {
    setProducts(products.map(p =>
      p.id === productId
      ? {...p, discounts: p.discounts.filter((d, idx) => idx !== discountIndex)}
      : p
    ));
  }, []);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    addProductDiscount,
    removeProductDiscount,
  }
}