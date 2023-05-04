import Fingerprint2 from "fingerprintjs2";
// 获取浏览器指纹
export const createFingerprint = () => {
  Fingerprint2.get((components) => {
    const values = components.map((component, index) => {
      if (index === 0) {
        //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
        return component.value.replace(/\bNetType\/\w+\b/, "");
      }
      return component.value;
    });
    // 生成最终id murmur
    let murmur = Fingerprint2.x64hash128(values.join(""), 31);
    localStorage.setItem("browserId", murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
  });
};
