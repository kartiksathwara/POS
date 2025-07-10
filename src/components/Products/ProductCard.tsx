interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity: number;
  };
  onAdd: () => void;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <div
      className="flex h-24 justify-between items-center p-4 rounded-md bg-gray-100 shadow-sm hover:shadow-md"
    >
      <div onClick={onAdd} className="flex items-center gap-4 cursor-pointer">
        <img
          // src={product.thumbnail}
          src={`http://localhost:5000/uploads/${product.thumbnail}`}
          alt={product.title}
          className="w-16 h-16 rounded-sm object-cover"
        />
        <div>
          <h3 className="font-semibold text-base">{product.title}</h3>
          <p className="text-sm text-gray-500">Size - 30 UK</p>
        </div>
      </div>
      
      <div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
    </div>
  );
};

export default ProductCard;
