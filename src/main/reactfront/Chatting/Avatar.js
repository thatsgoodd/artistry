import React from 'react';
import { View, Text, Image } from 'react-native';

// Avatar 컴포넌트의 기본 파라미터를 설정
const Avatar = ({ author, currentUserIsAuthor, showAvatar = true, showUserAvatars = true, theme }) => {
  // 기본 값이 필요 없는 경우는 기본 파라미터를 생략할 수 있습니다
  return (
    <View>
      {/* 여기서 `author`가 `undefined`일 때는 'Unknown' 또는 기본 이미지를 사용할 수 있습니다 */}
      {showAvatar && (
        <Image
          source={{ uri: author?.avatar || 'default-avatar-url' }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      )}
      {showUserAvatars && <Text>{author?.name || 'Unknown'}</Text>}
    </View>
  );
};

export default Avatar;
