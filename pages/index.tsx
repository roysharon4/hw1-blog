import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { PageBar } from "../components/PageBar";
import prisma from '../lib/prisma'
import { getSession } from "next-auth/react";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const postPerPage = 10;
  const session = await getSession({ req });
  const postAmount = await prisma.post.count({
    where: !session ? { published: true } :
      {
        OR: [
          { published: true },
          {
            published: false,
            author: { email: session.user?.email },
          },
        ],
      }
  });
  const NumberOfPages = Math.ceil(postAmount / postPerPage);
  const pageNumber = parseInt(query.page as string, 10) || 1;
  const skip = (pageNumber - 1) * postPerPage;
  const feed = await prisma.post.findMany({
    take: postPerPage,
    skip: skip,
    where: !session ? { published: true } :
      {
        OR: [
          { published: true },
          {
            published: false,
            author: { email: session.user?.email },
          },
        ],
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
    props: {
      feed,
      pageNumber,
      NumberOfPages,
    },
  };
};

type Props = {
  feed: PostProps[];
  pageNumber: number;
  NumberOfPages: number;
};

const Blog: React.FC<Props> = (props) => {
  const { feed, pageNumber, NumberOfPages } = props;
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <PageBar totalPosts={NumberOfPages} pageNumber={pageNumber} />
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
