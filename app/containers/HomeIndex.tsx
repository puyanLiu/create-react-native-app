import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { userActions } from '../model/user';
import { INormalComponentProps, normalConnect } from '../utils';
import { connect } from 'react-redux';

interface IHomeProps extends INormalComponentProps  {
}

interface IHomeState {
  progress: number;
}

// @normalConnect()
class HomeIndex extends Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps) {
    super(props);
    // this._request = this._request.bind(this);
  }

  componentDidMount() {
  }

  _request() {
    console.log('网络请求');

    this.props.dispatch(
      userActions.getLoginSmsCaptcha({
        phone: '13430264654',
      }),
    );
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <Text>Home Index!</Text>
        <Button title="网络请求" onPress={() => this._request()} />
      </View>
    );
  }
}

// export default HomeIndex;
const mapStateToProps = (state: any) => {
  console.log('home返回', state);
  return {
    userToken: state.userToken,
  };
};
export default connect(mapStateToProps)(HomeIndex);
