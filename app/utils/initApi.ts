import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import { take, call, put } from 'redux-saga/effects';
import xFetch from '../utils/xFetch';
import querystring from 'querystring';
import { DeviceEventEmitter } from 'react-native';
import { FETCHSTART, FETCHEND } from '../model/actionTypes';

export interface IApiConfig {
  /** api 接口的path */
  path: string;
  /** 请求方式 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** 描述 */
  desc?: string;
  /** 是否发起api.success的action */
  reducer?: boolean;
  /** 是否自动注入token,默认true */
  token?: boolean;
  /** 替换创建model时的modelName */
  modelName?: string;
  /** 是否隐藏loading */
  hideLoading?: boolean;
}

interface IApiActionType {
  request: string;
  success: string;
  error: string;
}

/**
 * keyof 操作符，用于类型查询
 */
interface IApi<T> {
  apiActionTypes: { [key in keyof T]: IApiActionType };
  apiActions: { [key in keyof T]: ActionFunctionAny<Action<any>> };
  sagas: any[];
}

/**
 * 创建Action名字
 * @param modelName
 * @param apiConfig
 */
function makeActionType(
  modelName: string,
  apiConfig: IApiConfig,
): IApiActionType {
  const { path } = apiConfig;
  return {
    request: `${modelName}/${path}/request`,
    success: `${modelName}/${path}/success`,
    error: `${modelName}/${path}/error`,
  };
}

/**
 * 创建接口请求
 * @param modelName
 * @param apiConfig
 */
function makeRequest(mName: string, apiConfig: IApiConfig) {
  return async (data: any) => {
    const method = apiConfig.method ? apiConfig.method.toUpperCase() : 'POST';
    const opts: any = {
      method,
    };
    const modelName = apiConfig.modelName || mName;
    let url = modelName ? `${modelName}/${apiConfig.path}` : apiConfig.path;

    if (method === 'GET') {
      // querystring.stringify json拼成字符串
      url = `${url}?${querystring.stringify(data)}`;
    } else {
      // 用于将 JavaScript 值转换为 JSON 字符串
      opts.body = data ? JSON.stringify(data) : null;
    }
    const res = await xFetch(url, opts);
    return res;
  };
}

let loadingIndex = 0;
/**
 * 创建saga effect
 * @param request
 * @param actionType
 * @param apiConfig
 */
function makeEffect(
  request: any,
  actionType: IApiActionType,
  apiConfig: IApiConfig,
) {
  return function* api_request() {
    while (true) {
      const req = yield take(actionType.request);
      const payload = req.payload || {};
      console.log(payload);
      const { ...rest } = payload;
      // const { userToken = {} } = yield select((state) => ({ userToken: state['userToken'] }));
      if (loadingIndex === 0 && !apiConfig.hideLoading) {
        // 显示loading
        DeviceEventEmitter.emit(FETCHSTART, {});
      }
      loadingIndex++;

      const res = yield call(request, { ...rest });
      if (res) {
        if (__DEV__ && console.group) {
          console.group(`%c 请求成功`, 'color: blue; font-weight: lighter;');
          console.log(`请求链接：`, req.type);
          console.log('返回数据：', res);
          console.groupEnd();
        }
        // status为0 成功
        if (res.status === 0) {
          if (apiConfig.reducer) {
            yield put(createAction(actionType.success)({ req: payload, res }));
          }
          DeviceEventEmitter.emit(actionType.success, { req: payload, res });
        }
      }

      loadingIndex--;
      if (loadingIndex === 0 && !apiConfig.hideLoading) {
        // 隐藏loading
        DeviceEventEmitter.emit(FETCHEND, {});
      }
    }
  };
}

function initApi<T>(modelName: string, apiConfigs: T): IApi<T> {
  const apiActionTypes = {} as any;
  const apiActions = {} as any;
  const sagas = [] as any;
  const newApiConfigs: any = apiConfigs;
  Object.keys(apiConfigs).forEach((key) => {
    const apiConfig: IApiConfig = {
      method: 'POST',
      reducer: true,
      token: true,
      ...newApiConfigs[key],
    };
    const actionType = makeActionType(modelName, apiConfig);
    apiActionTypes[key] = actionType;
    // 返回actionType
    apiActions[key] = createAction(actionType.request);
    const request = makeRequest(modelName, apiConfig);
    const effect = makeEffect(request, actionType, apiConfig);
    sagas.push(effect);
  });
  return {
    apiActionTypes,
    apiActions,
    sagas,
  };
}

export default initApi;
