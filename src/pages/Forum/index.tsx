import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForumList from './ForumList';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';

export default function Forum() {
  return (
    <Routes>
      <Route path="/" element={<ForumList />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/new" element={<CreatePost />} />
    </Routes>
  );
}