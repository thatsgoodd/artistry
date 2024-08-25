const WorkSharingposts = [
  {
    id: '1',
    categoryId: '건축',
    title: '건축 프로젝트 A',
    name: '홍길동',
    content: '이 프로젝트는 현대 건축의 혁신적인 접근 방식을 다루고 있습니다.',
    photos: [
      'https://plus.unsplash.com/premium_photo-1661954525357-c4b79d333720?q=80&w=771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1556594472-e9b933db923c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1571843439991-dd2b8e051966?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 15,
    likes: 30,
    createdAt: '2022-01-15T08:30:00Z',
    comments: []

  },
  {
    id: '2',
    categoryId: '그래픽 디자인',
    title: '그래픽 디자인 B',
    name: '김철수',
    content: '이 디자인 프로젝트는 최신 그래픽 디자인 트렌드를 반영하고 있습니다.',
    photos: [
      'https://images.unsplash.com/photo-1626654386409-180d8880fca5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1652804961521-c9fbc7a3f0f1?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 25,
    likes: 40,
    createdAt: '2022-05-22T14:45:00Z',
    comments: []
  },
  {
    id: '3',
    categoryId: '회화',
    title: '회화 작품 C',
    name: '이영희',
    content: '이 작품은 전통 회화 기법과 현대적 감각을 융합한 작품입니다.',
    photos: [
      'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1491245338813-c6832976196e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1609189184127-04652523de91?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 32,
    likes: 45,

    createdAt: '2022-09-10T09:20:00Z',
    comments: []
  },
  {
    id: '4',
    categoryId: '드로잉',
    title: '조각 작품 D',
    name: '박철수',
    content: '이 작품은 자연의 곡선을 모티브로 한 현대 조각입니다.',
    photos: [
      'https://images.unsplash.com/photo-1580574108069-3d553e1d87e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1579341438001-0f21b3789fd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 35,
    likes: 60,
    createdAt: '2022-12-31T16:00:00Z',
    comments: []
  },
  {
    id: '5',
    categoryId: '사진',
    title: '디지털 아트 작품 E',
    name: '김민지',
    content: '이 작품은 추상적 형태를 통해 디지털 시대의 감정을 표현했습니다.',
    photos: [
      'https://images.unsplash.com/photo-1553185788-d49be1bf9341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1562035767-d1a82293d24f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1559127452-3f0c6e1d2c36?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 14,
    likes: 12,
    createdAt: '2023-03-12T11:15:00Z',
    comments: []
  },
  {
    id: '6',
    categoryId: '사진',
    title: '사진 작품 F',
    name: '최지훈',
    content: '이 작품은 도시의 밤을 주제로 한 흑백 사진입니다.',
    photos: [
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1508768516479-8f680e229d34?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 45,
    likes: 14,
    createdAt: '2023-06-08T07:50:00Z',
    comments: []
  },
  {
    id: '7',
    categoryId: '회화',
    title: '회화 작품 G',
    name: '김하늘',
    content: '이 작품은 자연 풍경을 모티브로 한 서정적 회화입니다.',
    photos: [
      'https://images.unsplash.com/photo-1505575967456-2c0b25a333a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1543385420-5ec5011f4d4b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1529757797553-fbc54f10b4a1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 25,
    likes: 52,
    createdAt: '2023-08-21T13:05:00Z',
    comments: []
  },
  {
    id: '8',
    categoryId: '산업디자인',
    title: '디지털 아트 작품 H',
    name: '윤정아',
    content: '이 작품은 색상의 대조를 통해 복잡한 감정을 표현했습니다.',
    photos: [
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1542978704-47ef79b8d66c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    profile: 'https://i.pinimg.com/564x/36/fa/7b/36fa7b46c58c94ab0e5251ccd768d669.jpg',
    bookmarkCount: 50,
    likes: 78,
    createdAt: '2023-10-19T18:40:00Z',
    comments: []
  }

];

export default WorkSharingposts;