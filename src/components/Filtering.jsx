import React from 'react';
import '../App.css';

const Filtering = ({ selectedCategory, handleCategoryChange, selectedPrice, handlePriceChange, selectedSort, handleSortChange }) => {
  return (
    <div className="filtering-container container-fluid mt-3 mb-4 p-3">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2 className='fs-1 mb-4 filtering-titel'>Veckans deals</h2>
        </div>
      </div>
      <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4" style={{width: '350px'}}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="sort">Sortera efter pris: </label>
            <select
              className="form-select"
              id="sort"
              onChange={handleSortChange}
              value={selectedSort}
            >
              <option value="">Rekommenderad</option>
              <option value="lowToHigh">Lågt till högt</option>
              <option value="highToLow">Högt till lågt</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 " style={{width: '350px'}}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="category">Sortera efter: </label>
            <select
              className="form-select"
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory || ''}
            >
              <option value="">Alla kategorier</option>
              <option value="laptop">Laptop</option>
              <option value="mobiltelefoner">Mobiltelefoner</option>
              <option value="dammsugare">Dammsugare</option>
              <option value="TV">TV</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4" style={{width: '350px'}}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="price">Prisintervall: </label>
            <select
              className="form-select"
              id="price"
              onChange={(event) => handlePriceChange(event.target.value)}
              value={selectedPrice || ''}
            >
              <option value="">Alla priser</option>
              <option value="0-5000">0 - 5000</option>
              <option value="5000-1000">5000 - 10000</option>
              <option value="10000-15000">10000 - 15000</option>
              <option value="16000">Över 16000</option>
            </select>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Filtering;