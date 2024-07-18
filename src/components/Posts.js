// import React, { useEffect, useState } from 'react';
// import { fetchPosts, likePost } from '../services/api';

// const Posts = ({ token }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const response = await fetchPosts(token);
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     getPosts();
//   }, [token]);

//   const handleLike = async (postId) => {
//     try {
//       await likePost(postId, token);
//       setPosts(posts.map(post =>
//         post.id === postId
//           ? {
//               ...post,
//               like_count: post.is_liked ? post.like_count - 1 : post.like_count + 1,
//               is_liked: !post.is_liked,
//             }
//           : post
//       ));
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Posts</h2>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>
//             <p>Author: {post.author}</p>
//             <p>Likes: {post.like_count}</p>
//             <button onClick={() => handleLike(post.id)}>
//               {post.is_liked ? 'Unlike' : 'Like'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect, useState } from 'react';
import { fetchPosts, likePost } from '../services/api';
import '../index.css';

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts(token);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [token]);

  const handleLike = async (postId) => {
    try {
      await likePost(postId, token);
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              like_count: post.is_liked ? post.like_count - 1 : post.like_count + 1,
              is_liked: !post.is_liked,
            }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.like_count}</p>
            <button onClick={() => handleLike(post.id)}>
              {post.is_liked ? 'Unlike' : 'Like'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
