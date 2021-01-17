import React, {useEffect, useContext} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BlogContext from '../context';

const windowWidth = Dimensions.get('window').width;

const BlogListScreen = ({navigation}) => {
  const {
    data,
    page,
    isLoading,
    refreshing,
    getBlogPosts,
    handleRefresh,
    handleLoadMore,
  } = useContext(BlogContext);

  useEffect(() => {
    console.log('UseEffect çalıştı');
    getBlogPosts();
  }, [page]);

  return (
    <View style={{flex: 1, backgroundColor:'#343a40', paddingHorizontal:10}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          //style={{marginHorizontal:20}}
          data={data}
          keyExtractor={(item) => item.postId.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BlogDetailScreen', {item})}>
              <View
                style={{
                
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                  backgroundColor:'#495057',
                  borderRadius: 10,
                  borderColor: '#000',
                }}>
                <Text style={styles.titleText}>{item.title}</Text>

                <Image source={{uri: item.banner}} style={styles.imageBanner} />

                <Text style={styles.summaryText}>{item.summary}</Text>

                <View style={styles.readingTimeContainer}>
                  <Text style={styles.readingTimeText}>
                    Reading Time {item.totalReadingTime} min
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default BlogListScreen;

const styles = StyleSheet.create({
  touchableContainer: {
    margin: 10,
    padding: 10,
  },
  titleText: {
    color:'#f8f9fa',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    width: (windowWidth * 8) / 10,
  },
  imageBannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: 200,
  },
  imageBanner: {
    height: 200,
    width: (windowWidth * 8) / 10,
    resizeMode: 'stretch',
    borderRadius: 15,
  },
  summaryText: {
    fontSize: 16,
    color:'#f8f9fa',
    marginTop: 10,
    width: (windowWidth * 8) / 10,
  },
  readingTimeContainer: {
    margin: 10,
  },
  readingTimeText: {
    color:'#fefae0',
    marginTop: 1,
    width: (windowWidth * 8) / 10,
  },
});