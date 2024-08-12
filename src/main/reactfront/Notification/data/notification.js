const notifications = [
  {
    id: '1',
    type: 'like',
    profilePic: 'https://example.com/profile1.jpg',
    username: 'user1',
    postTitle: '내 게시물 제목',
    timestamp: '2024-08-12 14:30',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    profilePic: 'https://example.com/profile2.jpg',
    username: 'user2',
    postTitle: '내 게시물 제목',
    comment: '정말 멋진 글이에요!',
    timestamp: '2024-08-12 15:00',
    read: false,
  },
  {
    id: '3',
    type: 'reply',
    profilePic: 'https://example.com/profile3.jpg',
    username: 'user3',
    postTitle: '내 댓글',
    reply: '맞아요, 저도 그렇게 생각해요!',
    timestamp: '2024-08-12 16:00',
    read: false,
  },
  {
    id: '4',
    type: 'follow',
    profilePic: 'https://example.com/profile4.jpg',
    username: 'user4',
    timestamp: '2024-08-12 17:00',
    read: false,
  },
];

export default notifications;