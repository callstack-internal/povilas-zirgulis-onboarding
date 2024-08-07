import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#CCCCCC" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Layout;
