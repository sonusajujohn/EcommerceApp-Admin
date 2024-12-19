import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfferManagement = () => {
  const [offers, setOffers] = useState([]);
  const [productId, setProductId] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [offerType, setOfferType] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    // Fetch existing offers
    axios.get('/api/offers')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  const handleAddOffer = async (e) => {
    e.preventDefault();
    try {
      const newOffer = {
        productId,
        discount,
        startDate,
        endDate,
        description,
        offerType
      };
      const response = await axios.post('http://localhost:5000/api/offer/addoffer', newOffer);
      setOffers([...offers, response.data.offer]); // Update the offers list
      clearForm();
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  const handleEditOffer = async (e) => {
    e.preventDefault();
    if (!selectedOffer) return;

    try {
      const updatedOffer = {
        productId,
        discount,
        startDate,
        endDate,
        description,
        offerType
      };
      const response = await axios.put(`http://localhost:5000/api/offer/updateoffer/${selectedOffer._id}`, updatedOffer);
      setOffers(offers.map(offer => offer._id === selectedOffer._id ? response.data.offer : offer));
      clearForm();
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/offer/deleteoffer${id}`);
      setOffers(offers.filter(offer => offer._id !== id)); // Remove the deleted offer from the list
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setProductId(offer.productId);
    setDiscount(offer.discount);
    setStartDate(offer.startDate);
    setEndDate(offer.endDate);
    setDescription(offer.description);
    setOfferType(offer.offerType);
  };

  const clearForm = () => {
    setProductId('');
    setDiscount('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setOfferType('');
    setSelectedOffer(null);
  };

  return (
    <div>
      <h1>Offer Management</h1>
      
      {/* Add or Edit Offer Form */}
      <form onSubmit={selectedOffer ? handleEditOffer : handleAddOffer}>
        <div>
          <label>Product ID</label>
          <input 
            type="text" 
            value={productId} 
            onChange={(e) => setProductId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Discount</label>
          <input 
            type="number" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Start Date</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>End Date</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Offer Type</label>
          <input 
            type="text" 
            value={offerType} 
            onChange={(e) => setOfferType(e.target.value)} 
            required 
          />
        </div>
        <div>
          <button type="submit">
            {selectedOffer ? 'Update Offer' : 'Add Offer'}
          </button>
        </div>
      </form>

      {/* Offer List */}
      <h2>Existing Offers</h2>
      <ul>
        {offers.map(offer => (
          <li key={offer._id}>
            <div>
              <p><strong>Product ID:</strong> {offer.productId}</p>
              <p><strong>Discount:</strong> {offer.discount}%</p>
              <p><strong>Start Date:</strong> {offer.startDate}</p>
              <p><strong>End Date:</strong> {offer.endDate}</p>
              <p><strong>Description:</strong> {offer.description}</p>
              <p><strong>Offer Type:</strong> {offer.offerType}</p>

              <button onClick={() => handleSelectOffer(offer)}>Edit</button>
              <button onClick={() => handleDeleteOffer(offer._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferManagement;
