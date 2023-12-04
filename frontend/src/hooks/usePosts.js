import { useMemo } from "react";

export const usePosts = (posts, sort, query, isFavorites) => {
  const sortedAndSearchedPosts = useMemo(() => {
    return posts.filter(post => {
      if (isFavorites) {
        return (
          post["title"].toLowerCase().includes(query.toLowerCase()) ||
          post["content"].toLowerCase().includes(query.toLowerCase())
        );
      }

      return post[sort].toLowerCase().includes(query.toLowerCase());
    });
  }, [sort, posts, query]);

  return sortedAndSearchedPosts;
};
