import React, { useState } from 'react';
import LinkPreview from './components/LinkPreview';
import styled from 'styled-components';


function App() {
  const [url, setUrl] = useState('');

  return (
    <Header>
      <BlockHotel>
      <h1>OG Meta Tag Fetcher</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '300px', padding: '5px' }}
      />
      <LinkPreview url={url} />
      </BlockHotel>

      <BlockHotel>
      <h1>OG Meta Tag Fetcher</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '300px', padding: '5px' }}
      />
      <LinkPreview url={url} />
      </BlockHotel>

    </Header>
    
  );
}

const BlockHotel=styled.div`
border: 1px solid black;
width:35%;
`;
const Header =styled.div`
margin-left: 10%;
  display: flex;
  justify-content: space-between; // space-between을 사용해 요소 간 간격을 최대화
  align-items: center; // 세로로 중앙 정렬
  width: 80%; // 부모의 너비를 100%로 설정
`;
export default App;
