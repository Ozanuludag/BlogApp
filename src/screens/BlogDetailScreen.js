import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const BlogDetailScreen = ({route}) => {
  const {item} = route.params;
  return (
    <View style={{flex: 1}}>
      <WebView
        scalesPageToFit={false}
        source={{html: item.content}}
        originWhitelist={['*']}
        style={{flex: 1, margin: 10}}
      />
    </View>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({});