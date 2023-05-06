import React, { useState } from "react";
import Router from "next/router";


export const PageBar: React.FC<{ totalPosts: number, pageNumber: number }> =
  ({ totalPosts, pageNumber }) => {
    const postPerPage: number = 10;
    const [currPage, setCurrPage] = useState(pageNumber);
    const handlePageChange = (newPageNumber: number) => {
      setCurrPage(newPageNumber);
      Router.push(`/?page=${newPageNumber}`);
    };
    return (
      <>
        <div className="pageBar">
          <button
            key={'first_page'}
            className={'pageBar_button'}
            onClick={() => {
              handlePageChange(Math.max(currPage - 5, 1));
            }}
          >{'backward'}</button>
          <button
            key={'<'}
            className={'pageBar_button'}
            onClick={() => {
              if (currPage > 1)
                handlePageChange(currPage - 1);
            }}
          >{'<'}</button>
          {Array.from({ length: currPage + 5 <= totalPosts ? 5 : totalPosts - currPage + 1 }, (_, i) => (
            <button
              key={currPage + i}
              className={`pageBar_button ${i === 0 && 'pageBar_button--active'}`}
              onClick={() => {
                handlePageChange(currPage + i);
              }}
            >{currPage + i}</button>
          ))}
          <button
            key={'<'}
            className={'pageBar_button'}
            onClick={() => {
              if (currPage < totalPosts)
                handlePageChange(currPage + 1);
            }}
          >{'>'}</button>
          <button
            key={'last_page'}
            className={'pageBar_button'}
            onClick={() => {
              handlePageChange(Math.min(currPage + 5, totalPosts));
            }}
          >{'forward'}</button>
        </div>
        <style jsx>{`
            .pageBar {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
              }
              
              .pageBar_button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                background-color: #f1f1f1;
                color: #333;
                width: 40px;
                height: 40px;
                margin: 0 5px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
              }
              
              .pageBar button:hover {
                background-color: #333;
                color: #fff;
              }

              .pageBar_button--active {
                background-color: #333;
                color: #fff;
                font-weight: bold;
                border-radius: 50%;
              }
            `}
        </style>
      </>
    );
  }