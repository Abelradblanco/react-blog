import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../src/config/firestore';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogDoc = doc(db, 'blogs', id);
        const blogSnapshot = await getDoc(blogDoc);

        if (!blogSnapshot.exists()) {
          throw Error('Blog not found');
        }

        const blogData = { id: blogSnapshot.id, ...blogSnapshot.data() };
        setBlog(blogData);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const blogDoc = doc(db, 'blogs', id);
      await deleteDoc(blogDoc);
      history.push('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/edit/${id}`}>
            <button>Edit</button>
          </Link>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;
