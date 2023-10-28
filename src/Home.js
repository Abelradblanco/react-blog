import React, { useState, useEffect } from 'react';
import BlogList from "./BlogList";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../src/config/firestore';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const snapshot = await getDocs(blogCollection);
        const blogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError("Could not fetch the data for that resource");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
