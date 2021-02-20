export default function Post({ post }) {
    return (
        <div key={post.id}>
          <img src={post.coverImage.url} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.author.name}</p>
          <p>{post.excerpt}</p>
        </div>
      );
}