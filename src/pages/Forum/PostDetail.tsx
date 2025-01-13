{/* Previous imports remain the same */}

export default function PostDetail() {
  // Previous state and effects remain the same

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/forum')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Forum
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {author && (
          <AuthorCard 
            author={author} 
            date={post.createdAt} // Changed from postDate to date
            className="mb-6"
          />
        )}
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
}