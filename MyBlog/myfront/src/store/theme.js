const state = {
    isLight: true,
    //字体初始颜色。纯白色，不会生效
    color: "#ffffff",
    //头像卡片颜色
    infoBgColor: "rgba(255,255,255,0.6)",
    //半透明背景颜色
    mainBg: "rgba(50,50,50,0.6)",
    //List卡片颜色
    cardBg: "rgb(100,100,100)",
  
    animateBg: "#0088b5",
    //header组件背景的颜色
    headFootBg: "#545c64",
  };
  
  const getters = {
    //字体的颜色
    color(state) {
      if (state.isLight) {
        // 标准主题下网页中字体的颜色，黑色，默认颜色
        state.color = "#000000";
      } else {
        // 深夜主题下网页中字体的颜色，灰色
        state.color = "#dddddd";
      }
       //返回样式，给各个组件
      return "color:" + state.color;
    },
  
    //头像卡片的颜色
    infoBgColor(state) {
      if (state.isLight) {
        state.infoBgColor = "rgba(255,255,255,0.6)";
      } else {
        state.infoBgColor = "rgba(0,0,0,0.6)";
      }
      return "background-color:" + state.infoBgColor;
    },
  
  
    //半透明的背景颜色
    mainBg(state) {
      if (state.isLight) {
          //标准模式，半透明的背景颜色纯白色
        state.mainBg = "rgba(	255,255,255,0.6)";
      } else {
          //深夜模式，半透明的背景颜色纯黑色
        state.mainBg = "rgba(50,50,50,0.6)";
      }
      //返回样式，给各个组件
      return "background-color:" + state.mainBg;
    },
  
  
    //List组件卡片颜色 
    cardBg(state) {
      if (state.isLight) {
      //标准模式下，list组件中卡片的颜色
        state.cardBg = "#ffffff";
      } else {
      //深夜模式，list组件中卡片的颜色
        state.cardBg = "#323232";
      }
      return "background-color:" + state.cardBg;
    },
  
    
  
    //？？？？？
    specialcardBg(state) {
      if (state.isLight) {
        state.cardBg = "#ffffff";
      } else {
        state.cardBg = "#323232";
      }
      return state.cardBg;
    },
    
    //????
    animateBg(state) {
      if (state.isLight) {
        state.animateBg = "#0088b5";
      } else {
        state.animateBg = "#777777";
      }
      return "background-color:" + state.animateBg;
    },
  
    //header组件的背景颜色
    headFootBg(state) {
      if (state.isLight) {
        state.headFootBg = "rgb(130, 130, 130)";
      } else {
        state.headFootBg = "rgb(50, 50, 50)";
      }
      return "background-color:" + state.headFootBg;
    },
  };
  
  const mutations = {
      //点击light组件触发islight变化
    CHANGETHEME(state) {
      state.isLight = !state.isLight;
    },
  };
  
  const actions = {};
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  