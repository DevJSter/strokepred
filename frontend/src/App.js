import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    age: '',
    heartRate: '',
    sleep: '',
    height: '',
    weight: '',
    body_fat_in_percent: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('/heartstrokepredict', formData);

      if (response.status === 200) {
        const result = response.data;
        setPrediction(result);
      } else {
        console.error('Failed to fetch prediction:', response.status, response.statusText);
        setPrediction('Error occurred during prediction.');
      }
    } catch (error) {
      console.error('Error while fetching prediction:', error);
      setPrediction('Error occurred during prediction.');
    } finally {
      setLoading(false);
    }
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const inputRowStyle = {
    display: 'flex',
    marginBottom: '10px',
    alignItems: 'center',
    width: '100%',
  };

  const labelStyle = {
    flex: '1',
    marginRight: '10px',
    color: '#000080',
    textAlign: 'left',
  };

  const inputStyle = {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #000080',
    marginLeft: '5px',
  };

  const buttonStyle = {
    background: '#000080',
    color: '#ffffff',
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    marginTop: '15px',
  };

  const titleStyle = {
    color: '#000080',
    fontWeight: 'bold',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const predictionResultStyle = {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  };

  return (
    <div>
      <h1 style={titleStyle}>Heartstroke Prediction</h1>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <div style={inputRowStyle}>
          <label style={labelStyle}>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputRowStyle}>
          <label style={labelStyle}>Heart Rate:</label>
          <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputRowStyle}>
          <label style={labelStyle}>Sleep Duration:</label>
          <input type="number" name="sleep" value={formData.sleep} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputRowStyle}>
          <label style={labelStyle}>Height:</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputRowStyle}>
          <label style={labelStyle}>Weight:</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={inputRowStyle}>
          <label style={labelStyle}>Body Fat Percentage:</label>
          <input type="number" name="body_fat_in_percent" value={formData.body_fat_in_percent} onChange={handleChange} style={inputStyle} required />
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {prediction !== null && (
        <div style={predictionResultStyle}>
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default App;