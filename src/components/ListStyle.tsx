import styled from "styled-components";

export const ListStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  & > li {
    width: 30%;
    list-style: none;
    padding: 10px 20px;
    border: solid 1px #e1e1e1;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  &:first-child {
    margin-right: 0;
  }
  & > li > h2 {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
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
