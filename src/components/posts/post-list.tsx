import { Post } from '@/lib/api';
import Link from 'next/link';

const PostList = ({ posts }:{ posts:Post[] }) => {
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
          {posts.length > 0 ? (
            posts.map(post => (
              <div className="col" key={post.id}>
                <Link href={`/posts/${post.id}`}>
                    <div className="card shadow-sm p-3">
                      <img src={post.image} alt={`${post.title} image`} width="100%" />
                      <div className="card-body">
                        <p className="card-text">
                          {post.title}
                        </p>
                      </div>
                    </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-100 d-flex p-5 justify-content-center">
              <p>No Posts added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;