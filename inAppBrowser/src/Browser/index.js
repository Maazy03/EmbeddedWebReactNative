import React, {useState, useRef} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

const Browser = () => {
  const [open, setOpen] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const webviewRef = useRef(null);

  const openLink = () => {
    setOpen(true);
  };
  const closeLink = () => {
    setOpen(false);
  };
  const backButtonHandler = () => {
    if (webviewRef.current)
    {
      console.log("Web view ref",webviewRef)
      webviewRef.current.goBack();
    } 
  };

  const frontButtonHandler = () => {
    if (webviewRef.current)
    {
      console.log("web view ref fwd",webviewRef)
      webviewRef.current.goForward();
    } 
  };

  return (
    <View>
      <Text style={{color: 'white'}}>HELLO</Text>
      <Button onPress={openLink} title="Open"></Button>
      <Button onPress={closeLink} title="Close"></Button>

      <View style={{height: 600, width: '100%'}}>
        {open && (
          <>
            <WebView
              ref={webviewRef}
              source={{uri: 'https://www.google.com'}}
              onNavigationStateChange={navState => {
                setCanGoBack(navState.canGoBack);
                setCanGoForward(navState.canGoForward);
                setCurrentUrl(navState.url);
              }}
            />
            <View style={styles.NavigationLayout}>
              <View style={styles.NavigationActions}>
                <TouchableOpacity onPress={backButtonHandler} title="Back">
                  <Icon
                    size={30}
                    name="chevron-left"
                    color="white"
                    backgroundColor="white"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.NavigationActions}>
                <TouchableOpacity onPress={frontButtonHandler} title="Forward">
                  <Icon
                    size={30}
                    name="chevron-right"
                    color="white"
                    backgroundColor="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Browser;
const styles = StyleSheet.create({
  NavigationLayout: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: '#454545',
    justifyContent: 'center',
  },
  NavigationActions: {
    height: '100%',
    // width: 100,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    // backgroundColor: 'purple',
  },
});
