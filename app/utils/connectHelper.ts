import { connect } from 'react-redux';

export interface INormalComponentProps {
  dispatch?: any;
}

interface INormalConnectProps {
  reducers?: string[];
}

/**
const mapStateToProps = (state: any) => {
    console.log('home返回', state);
    return {
      ...state.userToken,
    };
  };
export default connect(mapStateToProps)(HomeIndex);
 */
const normalConnect = (props?: INormalConnectProps) => (component: any) => {
  const { reducers = [] } = props || {};
  const mapStateToProps = (state: any) => {
    const filterState: { [key: string]: any } = {
      filterState: state.userToken,
    };
    if (reducers && reducers.length > 0) {
      reducers.forEach(key => {
        if (state[key] === undefined) {
          console.warn(
            `请检查传入的reducer的key是否正确:${key};\n当前reducer keys:${Object.keys(
              state,
            )}`,
          );
        } else {
          filterState[key] = state[key];
        }
      });
    }

    return filterState;
  };

  return connect(mapStateToProps, null, null, { })(component);
};

export { normalConnect };
