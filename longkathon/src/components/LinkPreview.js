import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // styled-components import

// Styled-components 정의
const PreviewContainer = styled.div`
  margin-top: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
`;

const ImageContainer = styled.div`
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #999;
`;

const LinkPreview = ({ url }) => {
  const [ogData, setOgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      fetchOGData(url);
    }
  }, [url]);

  const fetchOGData = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/get-og-data', { url });
      setOgData(response.data);
    } catch (err) {
      console.error('Error fetching OG data:', err);
      setError('Failed to fetch OG data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PreviewContainer>
      {ogData ? (
        <>
          <Title>OG Data Preview</Title>
          <Description><strong>Title:</strong> {ogData.title}</Description>
          <Description><strong>Description:</strong> {ogData.description}</Description>
          {ogData.image && (
            <ImageContainer>
              <strong>Image:</strong>
              <Image src={ogData.image} alt="OG Image" />
            </ImageContainer>
          )}
          <Description><strong>URL:</strong> {ogData.url}</Description>
        </>
      ) : (
        <Description>No OG data found.</Description>
      )}
    </PreviewContainer>
  );
};

export default LinkPreview;
