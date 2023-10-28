import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../src/config/firestore';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    try {
      // Add the new blog post to Firebase Firestore
      const docRef = await addDoc(collection(db, "blogs"), blog);

      console.log('Blog created with ID: ', docRef.id);
      setIsPending(false);
      history.push('/');
    } catch (error) {
      setIsPending(false);
      console.error('Error creating blog:', error);
    }
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body: </label>
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
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
}

export default Create;
