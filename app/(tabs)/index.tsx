import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function HomeScreen() {
  const [surahList, setSurahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://quranapi.pages.dev/api/surah.json');
        const data = await response.json();
        setSurahList(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <View className='p-4 bg-white h-full'>
      <Text className='text-3xl text-blue-500 p-2'>Al-Quran</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={surahList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className='p-2 border-b border-gray-200 bg-gray-100 rounded-lg mb-2'>
              <Text className='text-lg font-bold text-gray-800'>
                {index + 1}. {item.surahName} ({item.surahNameArabic})
              </Text>
              <Text className='text-sm text-gray-600'>
                {item.surahNameTranslation} - {item.revelationPlace} - {item.totalAyah} Ayahs
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
