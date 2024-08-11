// PhotoPicker.js
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

// 사진 선택 및 미리보기 기능을 포함한 훅
export const usePhotoPicker = (onPhotoSelected) => {
  const [photo, setPhoto] = useState(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('미디어 라이브러리 접근 권한이 필요합니다.');
    }
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 접근 권한이 필요합니다.');
    }
  };

  const handleCameraLaunch = async () => {
    await requestCameraPermissions();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      onPhotoSelected(uri);
    } else {
      alert('사진 촬영 취소');
    }
  };

  const handleImageLibraryLaunch = async () => {
    await requestPermissions();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      onPhotoSelected(uri);
    } else {
      alert('이미지 선택 취소');
    }
  };

  return { photo, handleCameraLaunch, handleImageLibraryLaunch };
};
