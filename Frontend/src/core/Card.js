import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({
  product,
  showViewProductButton = true,
}) => {

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="">
          <button className="btn btn__view">Quick View</button>
        </Link>
      )
    );
  };

  return (
    <div className="card">
        <ShowImage item={product} url="product" />
        <div className="card__body">
          <div className="card__header">{product.name.substring(0, 15)}</div>
          <p className="card__price">€ {product.price}</p>
          {showViewButton(showViewProductButton)}
        </div>
        <br />
      </div>
  );
};

export default Card;
