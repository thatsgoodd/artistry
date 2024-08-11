const fetchPlaceCoordinates = async (placeName) => {
  const apiKey = 'AIzaSyDPVIlopM1fUSOUpzWpHV8jddVvOHAX-NM'; // 자신의 API 키로 교체하세요
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${apiKey}`;
  
  console.log(`Request URL: ${url}`); // 디버깅을 위해 URL을 출력

  try {
    const response = await fetch(url);
    const result = await response.json();
    
    console.log('API Response:', result); // API 응답을 출력하여 디버깅

    if (result.status === 'OK') {
      if (result.results && result.results.length > 0) {
        const { lat, lng } = result.results[0].geometry.location;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('No results found');
      }
    } else {
      throw new Error(`API Error: ${result.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

// 예제 사용법:
fetchPlaceCoordinates('서울특별시 송파구 석촌호수로 58 동신빌딩').then(coords => {
  if (coords) {
    console.log(`Coordinates: ${coords.latitude}, ${coords.longitude}`);
  } else {
    console.log('Coordinates not found.');
  }
});
