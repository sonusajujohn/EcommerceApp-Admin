import React, { useState } from 'react';
import './AddProduct.css';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    image: null,
    brand: '',
    title: '',
    totalQuantity: '',
    sizeQuantities: { '6': '', '7': '', '8': '', '9': '', '10': '', '11': '' },
    color: '',
    price: '',
    discountedPrice: '',
    discountedPercentage: '',
    description: '',
    topCategory: 'men',
    subCategory: 'formals',
    selectedSizes: [] // Track selected sizes
  });

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSizeSelection = (e, size) => {
    const selectedSize = e.target.value;
    setProductData(prevState => {
      const newSelectedSizes = [...prevState.selectedSizes];
      if (selectedSize && !newSelectedSizes.includes(selectedSize)) {
        newSelectedSizes.push(selectedSize);
      } else {
        const index = newSelectedSizes.indexOf(selectedSize);
        if (index > -1) {
          newSelectedSizes.splice(index, 1);
        }
      }
      return { ...prevState, selectedSizes: newSelectedSizes };
    });
  };

  const handleSizeQuantityChange = (e, size) => {
    const { value } = e.target;
    setProductData({
      ...productData,
      sizeQuantities: { ...productData.sizeQuantities, [size]: value }
    });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  const menCategories = ['formals', 'casuals', 'boots', 'sandals/flipflops', 'sportswear', 'ethnic footwears'];
  const womenCategories = ['heels', 'flats', 'casualshoes', 'sportsshoes', 'ethnic footwear', 'boots'];

  const subCategories = productData.topCategory === 'men' ? menCategories : womenCategories;

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <div className="form-container">
        <div className="form-left">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {productData.image && <img src={productData.image} alt="Product" />}
        </div>
        <div className="form-right">
          <div className="input-group">
            <label>Brand</label>
            <input type="text" name="brand" value={productData.brand} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Title</label>
            <input type="text" name="title" value={productData.title} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Total Quantity</label>
            <input type="number" name="totalQuantity" value={productData.totalQuantity} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Color</label>
            <input type="text" name="color" value={productData.color} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Discounted Price</label>
            <input type="number" name="discountedPrice" value={productData.discountedPrice} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Discount Percentage</label>
            <input type="number" name="discountedPercentage" value={productData.discountedPercentage} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" value={productData.description} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Top Level Category</label>
            <select name="topCategory" value={productData.topCategory} onChange={handleCategoryChange}>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
          <div className="input-group">
            <label>Secondary Level Category</label>
            <select name="subCategory" value={productData.subCategory} onChange={handleCategoryChange}>
              {subCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="size-quantity-group">
            <h3>Size and Quantity</h3>
            {['6', '7', '8', '9', '10', '11'].map((size) => (
              <div key={size} className="size-quantity-field">
                <label>Size {size}</label>
                <input
                  type="checkbox"
                  value={size}
                  checked={productData.selectedSizes.includes(size)}
                  onChange={(e) => handleSizeSelection(e, size)}
                />
                {productData.selectedSizes.includes(size) && (
                  <div>
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={productData.sizeQuantities[size] || ''}
                      onChange={(e) => handleSizeQuantityChange(e, size)}
                      min="0"
                      max={productData.totalQuantity}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="add-product-btn">Add New Product</button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
