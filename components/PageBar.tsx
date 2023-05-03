import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Layout from "./Layout";


export const PageBar: React.FC<{postPerPage : number, totalPosts : number, setCurrentPage:Function , currentPage:number }> =
 ({postPerPage , totalPosts,setCurrentPage , currentPage}) => {
    let pages =[];
    
    for(let i=1; i<= Math.ceil(totalPosts / postPerPage); i++){
        pages.push(i)
    }

    return (
    <Layout>
        <div className="pageBar">
            {
                pages.map((page:number, index: number)=>{
                    return <button key={index}
                    onClick={()=>setCurrentPage(page)}
                    className={page === currentPage ? 'active' : ''}>
                         {page}</button>
                })
            }
        </div>
        <style jsx>{`
            .pageBar {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
              }
              
              .pageBar button {
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

              .pageBar button.active {
                background-color: #333;
                color: #fff;
                font-weight: bold;
                border-radius: 50%;
              }
            `}
        </style>
    </Layout>
    );
}

