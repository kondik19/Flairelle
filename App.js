import React from 'react';
import { NavigationComponent }  from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import { AppRegistry, Alert, TextInput,
    KeyboardAvoidingView, StyleSheet, WebView,
    View, Text, ToolbarAndroid, Button,
    DatePickerAndroid, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Display from 'react-native-display';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Constants } from 'expo';

class DekoShop extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Deko-Shop',
    tabBarIcon: () => (<Icon size={24} color="white" name="shopping-cart" />)
  }

  render() {
   return(
    <WebView
        source={{uri: 'http://flairelle.de/shop'}} />
   );
  }
}

class Kartenshop extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Kartenshop',
    tabBarIcon: () => (<Icon size={24} color="white" name="email" />)
  }

  render() {
   return(
    <WebView
        source={{uri: 'https://kartenshop.flairelle.de'}} />
   );
  }
}

class Magazin extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Magazin',
    tabBarIcon: () => (<Icon size={24} color="white" name="library-books" />)
  }

  render() {
   return(
    <WebView
        source={{uri: 'http://flairelle.de/magazin/'}} />
   );
  }
}

class Hochzeitstimer extends React.Component {
 constructor(props) {
    super(props);
    this.state = { text: '' , weddingDate: '', isDateTimePickerVisible: false};
  }


  static navigationOptions = {
    tabBarLabel: 'Hochzeitstimer',
    tabBarIcon: () => (<Icon size={24} color="white" name="timer" />)
  }

  saveEmail() {
    if (this.state.text.indexOf("@") === -1) {
         Alert.alert("Error", "Address e-mail is wrong.");
    } else {
        var email = this.state.text;
    }
  }

  async getStorageWeddingDate(){
    var value = await AsyncStorage.getItem('@Flairelle:weddingDate');
    if (value !== null){
        console.log(value);
        this.calculateDays(new Date(value));

    }
    return value
  }

  isWeddingDate() {
    if (this.state.weddingDate === '') {
        try {
          var value = this.getStorageWeddingDate();
        } catch (error) {
            console.log(error);
        }
        return false;
    } else {
        return true;
    }
  }

  setWeddingDate() {
    this.showDateTimePicker();
  }

  calculateDays(date) {
      var oneDay = 24*60*60*1000;
      var now = new Date(this.formatDate(new Date()));
      var days = Math.round(Math.abs((now.getTime() - date.getTime())/(oneDay)));

      this.setState({weddingDate: '' + days});
  }

  formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.calculateDays(new Date(this.formatDate(date)));
    this.hideDateTimePicker();
    try {
     console.log(this.formatDate(date));
      AsyncStorage.setItem('@Flairelle:weddingDate', this.formatDate(date));
    } catch (error) {
        console.log(error);
    }
  };

  render() {
   return(
    <KeyboardAvoidingView
        style={styles.timerContainer}
        behavior="position" >
        <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  minimumDate={new Date()}
                />
        <View style={styles.center}>
            <Display enable={this.isWeddingDate()}>
                <View style={styles.center}>
                    <Text>Noch</Text>
                    <Text style={styles.time}>{this.state.weddingDate} Tage</Text>
                    <Text>bis zu deiner Traumhochzeit</Text>
                </View>
            </Display>
            <Button
               onPress={() => this.setWeddingDate()}
               title="TERMIN EINTRAGEN"
               color="#d7505e"
               accessibilityLabel="TERMIN EINTRAGEN" />
        </View>
        <View style={styles.center}>
            <Text style={styles.newsletter}>Newsletter</Text>
            <Text style={styles.textCenter}>Jetzt zum Newsletter anmelden und alle Hochzeitsnews erhalten und Rabatte sichern:</Text>
            <TextInput
                placeholder="Name"
                placeholderTextColor="grey"
                style={styles.email}
                onChangeText={(email) => this.setState({text: email})}
                value={this.state.text} />
            <Button
              onPress={() => this.saveEmail()}
              title="ANMELDEN"
              color="#d7505e"
            />
        </View>
        <View style={styles.timerContainer}>
        </View>
    </KeyboardAvoidingView>
   );
  }
}

const TabNav = TabNavigator({
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

export default class App extends React.Component {
render() {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <ToolbarAndroid
                   title="Flairelle"
                   style={styles.bar}
                   titleColor="white"/>
            <TabNav />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  bar: {
    backgroundColor: '#d7505e',
    height: 56,
    elevation: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    color: '#d7505e',
    padding: 10
  },
  email: {
    height: 40,
    width: 260,
    padding: 8,
    borderColor: 'transparent',
    borderWidth: 0
  },
  newsletter: {
    fontSize: 28,
    margin: 8,
  },
  time: {
    fontSize: 36,
    margin: 4,
  },
  center: {
     alignItems: 'center',
     margin: 8,
  },
  textCenter: {
     textAlign: 'center',
  },
  statusBar: {
       backgroundColor: "#d7505e",
       height: Constants.statusBarHeight,
     },
});


AppRegistry.registerComponent('App', () => App);