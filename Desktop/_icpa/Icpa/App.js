import React from "react";
import { Image,Text } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./src/navigation/Screens";
import { Images, icpaTheme } from "./src/constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } 
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <Text>Loading...</Text>
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={icpaTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
