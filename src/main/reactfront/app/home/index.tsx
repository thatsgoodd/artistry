import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WorkSharePreview from "../../components/WorkSharePreview";
import CollaborationPreview from '../../components/CollaborationPreview';
import FreeboardPreview from "../../components/FreeboardPreview";
import TradePreview from "../../components/TradePreview";

const popular = [
    { id: '1', creatorName: 'User1', creatorPage: '/users/1', itemPage: '/items/1', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', creatorName: 'User2', creatorPage: '/users/2', itemPage: '/items/2', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', creatorName: 'User3', creatorPage: '/users/3', itemPage: '/items/3', imageUrl: 'https://via.placeholder.com/150' },
  ];
  
  const interests = [
    { id: '4', creatorName: 'User4', creatorPage: '/users/4', itemPage: '/items/4', imageUrl: 'https://via.placeholder.com/150' },
    { id: '5', creatorName: 'User5', creatorPage: '/users/5', itemPage: '/items/5', imageUrl: 'https://via.placeholder.com/150' },
    { id: '6', creatorName: 'User6', creatorPage: '/users/6', itemPage: '/items/6', imageUrl: 'https://via.placeholder.com/150' },
  ];
  
  const following = [
    { id: '7', creatorName: 'User7', creatorPage: '/users/7', itemPage: '/items/7', imageUrl: 'https://via.placeholder.com/150' },
    { id: '8', creatorName: 'User8', creatorPage: '/users/8', itemPage: '/items/8', imageUrl: 'https://via.placeholder.com/150' },
    { id: '9', creatorName: 'User9', creatorPage: '/users/9', itemPage: '/items/9', imageUrl: 'https://via.placeholder.com/150' },
  ];
  

  const allFreeboardPosts = [
    { id: '1', title: '첫 번째 글', content: '이것은 첫 번째 글의 내용입니다.', time: '2024-07-29 14:00' },
    { id: '2', title: '두 번째 글', content: '이것은 두 번째 글의 내용입니다.', time: '2024-07-29 15:00' },
    { id: '3', title: '세 번째 글', content: '이것은 세 번째 글의 내용입니다.', time: '2024-07-29 16:00' },
    { id: '4', title: '네 번째 글', content: '이것은 네 번째 글의 내용입니다.', time: '2024-07-29 17:00' },
    { id: '5', title: '다섯 번째 글', content: '이것은 다섯 번째 글의 내용입니다.', author: 'User5' },
    // 추가 데이터
  ];

const index = () => {
    const handlePostPress = (postId) => {
        // 해당 글의 상세 페이지로 이동
        alert(`Go to post ${postId}`);
      };
    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <WorkSharePreview
            title="작업 공유"
            sections={[
              { subtitle: "인기", data: popular },
              { subtitle: "관심", data: interests },
              { subtitle: "팔로잉", data: following },
            ]}
          />
          <FreeboardPreview title="자유게시판" posts={allFreeboardPosts} onPostPress={handlePostPress} />
          <CollaborationPreview title="협업 모집" posts={allFreeboardPosts} onPostPress={handlePostPress} />
          <TradePreview title="중고 거래"/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
