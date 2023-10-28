import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../src/config/firestore';

const Edit = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
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
        setTitle(blogData.title);
        setBody(blogData.body);
        setAuthor(blogData.author);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    const updatedBlog = { title, body, author };

    try {
      const blogDoc = doc(db, 'blogs', id);
      await updateDoc(blogDoc, updatedBlog);

      setIsPending(false);
      history.push(`/blogs/${id}`);
    } catch (error) {
      setIsPending(false);
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="edit">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {!isPending && <button>Update Blog</button>}
        {isPending && <button disabled>Updating blog...</button>}
      </form>
    </div>
  );
}

export default Edit;
