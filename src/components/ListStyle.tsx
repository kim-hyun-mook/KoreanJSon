import styled from "styled-components";

export const ListStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
  & > li {
    width: 29%;
    list-style: none;
    padding: 10px 20px;
    border: solid 1px #e1e1e1;
    border-radius: 4px;
    margin-bottom: 50px;
    position: relative;
  }

  & li > div > h2 {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }

  &:first-child {
    margin-right: 0;
  }
`;

export const DetailStyle = styled.div`
  border: solid 1px #e1e1e1;
  border-radius: 4px;
  padding: 10px 20px;
  & > h1 {
    font-size: 16px;
    margin-bottom: 10px;
    text-align: left;
  }
  & > p {
    font-size: 14px;
    text-align: left;
  }
`;
