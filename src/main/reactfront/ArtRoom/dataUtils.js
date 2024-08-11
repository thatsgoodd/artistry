// dataUtils.js

const data = require('../ArtRoom/data/siGungu.json'); // JSON 파일 경로에 맞게 수정

// 시를 선택했을 때 해당 시의 군/구 목록을 반환
export const getDistrictOptions = (selectedCity) => {
  const cityData = data.find(area => area.name === selectedCity);
  return cityData ? cityData.subArea.map(district => ({
    label: district,
    value: district,
  })) : [];
};
