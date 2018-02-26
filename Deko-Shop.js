 if (position === this.state.tabPosition) {
        return true;
    }


import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ToolbarAndroid, Alert, WebView} from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Display from 'react-native-display';

export default class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {tab: [true, false, false, false]};
  }

  onTabSelected(position) {
    switch (position) {
            case 0:
                this.setState({tab: [true, false, false, false]})
                break;
            case 1:
                this.setState({tab: [false, true, false, false]})
                break;
            case 2:
                this.setState({tab: [false, false, true, false]})
                break;
            case 3:
                this.setState({tab: [false, false, false, true]})
                break;
            default:
                break;
        }
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
            title="Flairelle"
            style={styles.bar}
            titleColor='white' />
              <Display style={styles.container} enable={this.state.tab[0]}>
                   <WebView
                       source={{uri: 'http://flairelle.de/shop'}} />
              </Display>
              <Display style={styles.container}  enable={this.state.tab[1]}>
                   <WebView
                       source={{uri: 'https://kartenshop.flairelle.de'}} />
              </Display>
              <Display style={styles.container}  enable={this.state.tab[2]}>
                   <WebView
                       source={{uri: 'http://flairelle.de/magazin/'}} />
              </Display>
              <Display style={styles.container}  enable={this.state.tab[3]}>
                   <WebView
                       source={{uri: 'http://google.com'}} />
              </Display>
        <BottomNavigation
              labelColor="white"
              rippleColor="white"
              style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
              onTabChange={(newTabIndex) =>  this.onTabSelected(newTabIndex)}
            >
              <Tab
                barBackgroundColor="#d7505e"
                label="Deko-Shop"
                icon={<Icon size={24} color="white" name="shopping-cart" />}
              />
              <Tab
                barBackgroundColor="#d7505e"
                label="Kartenshop"
                icon={<Icon size={24} color="white" name="email" />}
              />
              <Tab
                barBackgroundColor="#d7505e"
                label="Magazin"
                icon={<Icon size={24} color="white" name="library-books" />}
              />
              <Tab
                barBackgroundColor="#d7505e"
                label="Hochzeitstimer"
                icon={<Icon size={24} color="white" name="timer" />}
              />
        </BottomNavigation>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: '#d7505e',
    height: 56,
  },
});

AppRegistry.registerComponent('App', () => App);






const Tabs = TabNavigator({
  DekoShop: { screen: DekoShop },
  Kartenshop: { screen: Kartenshop },
  Magazin: { screen: Magazin },
  Hochzeitstimer: { screen: Hochzeitstimer },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        DekoShop: {
          barBackgroundColor: '#d7505e'
        },
        Kartenshop: {
          barBackgroundColor: '#d7505e'
        },
        Magazin: {
          barBackgroundColor: '#d7505e'
        },
        Hochzeitstimer: {
          barBackgroundColor: '#d7505e'
        },
      }
    }
  }
});

<ToolbarAndroid
                   title="Flairelle"
                   style={styles.bar}
                   titleColor="white"/>
                   <View style={styles.container}>
                   </View>