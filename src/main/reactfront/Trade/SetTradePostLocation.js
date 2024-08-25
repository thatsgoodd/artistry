import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocation } from './TradeLocationContext'; // Context import

// 시도 및 시군구 데이터
const provinces = [
  { id: "1", name: "전국" },
  { id: "2", name: "서울" },
  { id: "3", name: "경기" },
  { id: "4", name: "인천" },
  { id: "5", name: "강원" },
  { id: "6", name: "대전" },
  { id: "7", name: "세종" },
  { id: "8", name: "충남" },
  { id: "9", name: "충북" },
  { id: "10", name: "부산" },
  { id: "11", name: "울산" },
  { id: "12", name: "경남" },
  { id: "13", name: "경북" },
  { id: "14", name: "대구" },
  { id: "15", name: "광주" },
  { id: "16", name: "전남" },
  { id: "17", name: "전북" },
  { id: "18", name: "제주" },
];

const districts = {
  서울: [
    "전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  경기: [
    "전체",
    "수원시",
    "성남시",
    "안양시",
    "부천시",
    "고양시",
    "용인시",
    "안산시",
    "화성시",
    "평택시",
    "김포시",
    "군포시",
    "오산시",
    "구리시",
    "양주시",
    "포천시",
    "동두천시",
    "여주시",
  ],
  // Add other provinces and their districts here
  전국: ["전체"],
};



const SetLocation = ({ navigation }) => {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtsList, setDistrictsList] = useState([]);

  useEffect(() => {
    if (selectedProvince) {
      setDistrictsList(districts[selectedProvince] || []);
    } else {
      setDistrictsList([]);
    }
  }, [selectedProvince]);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null); // Reset district when province changes
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  const handleConfirm = () => {
    Alert.alert(
      "지역 선택 확인",
      `선택한 지역: ${selectedProvince} - ${selectedDistrict || "전체"}`,
      [
        {
          text: "취소",
          onPress: () => {},
        },
        {
          text: "확인",
          onPress: () => {
            setSelectedLocation({
              province: selectedProvince,
              district: selectedDistrict,
            });
            navigation.goBack(); // 화면 종료 및 이전 화면으로 돌아가기
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack(); // 화면 종료 및 이전 화면으로 돌아가기
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>중고 거래 지역 선택</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.panel}>
          <View style={styles.headerContainer}>
            <View style={styles.panelTitleContainer}>
              <Text style={styles.panelTitle}>시도</Text>
            </View>
            <View style={styles.panelTitleContainer}>
              <Text style={styles.panelTitle}>시군구</Text>
            </View>
          </View>
          <View style={styles.innerContent}>
            <ScrollView style={styles.leftPanel}>
              {provinces.map((province) => (
                <TouchableOpacity
                  key={province.id}
                  style={[
                    styles.item,
                    selectedProvince === province.name && styles.selectedItem,
                  ]}
                  onPress={() => handleProvinceSelect(province.name)}
                >
                  <Text style={styles.itemText}>{province.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={styles.rightPanel}>
              {selectedProvince ? (
                districtsList.length > 0 ? (
                  districtsList.map((district) => (
                    <TouchableOpacity
                      key={district}
                      style={[
                        styles.item,
                        selectedDistrict === district && styles.selectedItem,
                      ]}
                      onPress={() => handleDistrictSelect(district)}
                    >
                      <Text style={styles.itemText}>{district}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.itemText}>
                    선택된 시도에 대한 시군구가 없습니다.
                  </Text>
                )
              ) : (
                <Text style={styles.itemText}>시도를 선택해주세요.</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B4872",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#888",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 50,
  },
  panel: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 50,
    textAlign: "center",
    paddingVertical: 15,
  },
  panelTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  innerContent: {
    flexDirection: "row",
  },
  leftPanel: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  rightPanel: {
    flex: 2,
    backgroundColor: "#fff",
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
  buttonsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonCancel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9534f", // Red color for cancel
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  buttonConfirm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B4872", // Blue color for confirm
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SetLocation;
