import m15 from "./menus/testMenus1/areaSelect.vue";
import m312 from "./menus/testMenus1/charts.vue";
import m12 from "./menus/testMenus1/uploadImage.vue";
import m14 from "./menus/testMenus1/uploadFiles.vue";
import m17 from "./menus/testMenus1/pageTable.vue";
import m101 from "./menus/testMenus1/aaa-treeForm.vue";
import m13 from "./menus/testMenus1/bigPic.vue";
import m18 from "./menus/testMenus1/uexcel.vue";
import n11 from "./menus/testMenus1/testnewalarm.vue";
/**
 * 自定义的菜单页组件注册
 * @param {*} Vue 
 */
export function menuReg(Vue){
    Vue.component('m15', m15)
    Vue.component('m312', m312)
    Vue.component('m12', m12)
    Vue.component('m14', m14)
    Vue.component('m17', m17)
    Vue.component('m101', m101)
    Vue.component('m13', m13)
    Vue.component('m18', m18)
    Vue.component('n11', n11)
}

/**
 * 自定义通用组件注册
 * @param {*} Vue 
 */
export function componentReg(Vue){

}

/**
 * 自定义指令注册
 * @param {*} Vue 
 */
export function directiveReg(Vue){

}