import React, {useEffect, useState} from 'react'
import { Descriptions } from 'antd';

function ProductInfo(props) {

    const [product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.item)
    }, [props.item])

    const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };

    return (
        <div>
            <Descriptions title="Product Info" style={{textAlign:"left"}}>
                <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
                <Descriptions.Item label="Category">{product.category && product.category.name}</Descriptions.Item>
                <Descriptions.Item label="Stock">{showStock(product.quantity)}</Descriptions.Item>
                <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ProductInfo