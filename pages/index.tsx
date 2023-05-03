import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { PageBar } from "../components/PageBar";
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const [currPage, setCurrPage] = useState(1);
  const postPerPage:number = 10;
  const endIndex = currPage * postPerPage;
  const startIndex = endIndex - postPerPage;

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.slice(startIndex, endIndex).map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <PageBar postPerPage={postPerPage} totalPosts={props.feed.length} setCurrentPage={setCurrPage} currentPage={currPage}/>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;










// import React from "react";
// import type { GetServerSideProps } from "next";
// import Layout from "../components/Layout";
// import Post, { PostProps } from "../components/Post";
// import prisma from '../lib/prisma'

// export const getServerSideProps: GetServerSideProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   return {
//     props: { feed },
//   };
// };

// type Props = {
//   feed: PostProps[];
// };

// const Blog: React.FC<Props> = (props) => {
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {props.feed.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <h2 style={{textAlign: "center"}}>page</h2>
      
//       <div className="pagination">
//         <a href="#">&laquo;</a>
//         <a href="#">1</a>
//         <a href="#">2</a>
//         <a href="#">3</a>
//         <a href="#">4</a>
//         <a href="#">5</a>
//         <a href="#">6</a>
//         <a href="#">&raquo;</a>
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//         .pagination {
//           display: inline-block;
//           margin: 20px auto;

//         }
        
//         .pagination a {
//           color: black;
//           float: left;
//           padding: 8px 16px;
//           text-decoration: none;
//           margin: 20px auto;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Blog;



// import React from "react";
// import type { GetServerSideProps } from "next";
// import Layout from "../components/Layout";
// import Post, { PostProps } from "../components/Post";
// import prisma from '../lib/prisma';
// import { useRouter } from 'next/router';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = parseInt((context.query.page as string) || "1", 10);
//   const feed = await prisma.post.findMany({
//     take: 10,
//     skip: (page-1)*10,
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   const postCount = await prisma.post.count({
//     where: {
//       published: true,
//     },
//   });
//   const pageCount = Math.ceil(postCount / 10);

//   return {
//     props: { feed, page, pageCount }
//   };
// };

// type Props = {
//   feed: PostProps[];
//   page: number;
//   pageCount: number;
// };

// const Blog = ({ feed, page, pageCount }: Props) => {
//   const router = useRouter();

//   const handlePageClick = (pageNum: number) => {
//     router.push(`/?page=${pageNum}`);
//   };

//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {feed.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <h2 style={{ textAlign: "center" }}>page</h2>

//       <div className="pagination">
//         {Array.from({ length: pageCount }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageClick(i + 1)}
//             className={i + 1 === page ? 'active' : ''}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//         .pagination {
//           display: inline-block;
//           text-align: center;
//         }

//         .pagination button {
//           color: black;
//           background: transparent;
//           border: none;
//           padding: 8px 16px;
//           text-decoration: none;
//           margin: 20px auto;
//           cursor: pointer;
//           outline: none;
//         }

//         .pagination button.active {
//           background-color: #ddd;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Blog;