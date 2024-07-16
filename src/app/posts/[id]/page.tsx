import Link from 'next/link';
import { notFound } from 'next/navigation'
import { User } from '@/lib/auth/User';
import { Post, PostsService } from '@/lib/api';
import { getServerAuthSession } from '@/lib/auth';

const PostDetail = async ({ params } : { params : { id : string } }) => {
  let post:Post
  try {
    post = await PostsService.postsRetrieve(parseInt(params.id))
  } catch (error) {
    notFound()
  }
  const session = await getServerAuthSession()
  const user = session?.user as User

  return (
    <main className="container mb-5">
      <div className="row row-cols-1 mt-5">
        <div className="col">
          <img src={post.image} className="w-100" alt={post.title} />
        </div>
        <div className="col">
          <h1>{post.title}</h1>
          <p className="text-info text-small mt-3">By {post.author}</p>
          <p className="mt-3">{post.description}</p>
          <p className="mt-3">{post.content}</p>
          <div className="d-flex gap-4 align-items-center w-100">
            {user && user.username === post.author && (
              <>
                <form action="" className="me-3">
                  <button type="submit" className="btn btn-danger">Delete</button>
                </form>
                <Link href={`${post.id}/update`} className="btn btn-primary">
                  Edit
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostDetail;
