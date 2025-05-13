import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return <div>Product Detail Page for ID: {id}</div>;
};

export default ProductDetail;
