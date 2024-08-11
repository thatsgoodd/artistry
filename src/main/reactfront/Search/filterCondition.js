// filterCondition.js
export const sortPosts = (posts, period, type, popularity) => {
  if (!posts) return []; // posts가 undefined인 경우 빈 배열 반환

  // 기간별 정렬
  if (period === '최신순') {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (period === '오래된순') {
    posts.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // 작업 유형 필터
  if (type && type !== '모든 작업') {
    posts = posts.filter(post => post.type === type);
  }

  // 인기순 정렬
  if (popularity === '좋아요 많은순') {
    posts.sort((a, b) => b.likes - a.likes);
  } else if (popularity === '스크랩 많은순') {
    posts.sort((a, b) => b.saves - a.saves);
  }

  return posts;
};
