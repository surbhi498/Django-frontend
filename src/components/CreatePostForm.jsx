import React, { useState } from 'react';
import styled from 'styled-components';
import { createPost } from '../services/api'; // Import your create post API service

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  form {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center items horizontally */
  }
`;

const Input = styled.input`
  width: 100%; /* Full width of the container */
  max-width: 100%; /* Ensure it does not exceed container width */
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%; /* Full width of the container */
  max-width: 100%; /* Ensure it does not exceed container width */
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  margin: 20px 0 0 auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #007BFF;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const CreatePostForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      await createPost(token, title, content);
      // Handle successful post creation (e.g., show a success message, clear form, etc.)
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <Button type="submit">Create Post</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default CreatePostForm;
