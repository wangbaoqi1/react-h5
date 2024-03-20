import Toast from "light-toast";
import { MWPRequest, MWPFilter, MWPListFilter, MWP_ENVS } from "@lnpm/mwp";

// 这一步主要是适配 H5 嵌入到 app 或小程序时，需要将容器层的 mwp 配置
// 中的 appName 注入到 H5 的 mwp 中去，通过 wormhole 这个 NPM 包
// 提供的方法进行这一层的转接
import wormhole from "@lnpm/wormhole";
let { appName, token, userAppChannel } = wormhole.h5.init();
if (!appName) appName = "mw";

const requestFilter = (req) => {
  console.log("requestFilter", { req });
  return {
    ...req,
    headers: { ...req.headers, token, userAppChannel },
  };
};

const mwp = new MWPRequest({
  env: MWP_ENVS[REACT_APP_ENV],
  appName,
  useHttps: window.location.protocol.indexOf("https") > -1,
  requestFilter,
});

mwp.setCustomMessageForReject((err) => {
  if (err.errCode === 1027) {
    // 用户未登录的场景
    console.error("[mwp 错误]", "未登录");
  } else {
    console.error("[mwp 错误]", err.errMsg);
  }

  Toast.fail(err.errMsg);
});

export default mwp;
export { MWPFilter, MWPListFilter, MWP_ENVS };
