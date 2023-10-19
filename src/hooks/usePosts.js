import { useMemo } from "react";

export const usePosts = (posts, sort, query) => {
  const sortedAndSearchedPosts = useMemo(() => {
    return posts.filter(post => {
      // console.log(post[sort.split(' ')[1].toLowerCase()].includes(query.toLowerCase()));
      return post[sort].toLowerCase().includes(query.toLowerCase());
    });
  }, [sort, posts, query]);

  return sortedAndSearchedPosts;
};
