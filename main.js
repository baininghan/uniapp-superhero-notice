import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.serverUrl = "";
Vue.prototype.onlineImageUrl = "http://122.152.205.72:88/superhero/MARVEL/Venom/cover.jpg";
Vue.prototype.onlineVideoUrl = "https://ugcydzd.qq.com/uwMROfz2r5zCIaQXGdGnC2dfDmavB6NbsWKJAiRTQBPbT70a/o07489z2xpu.mp4?sdtfrom=v1010&guid=6712892f828e6d416fbbc4057b7713e9&vkey=A8412695DBC349A2ECEF60747B58E21045E51F320200EC2C014EBA776CB1214C25E3DC34FF0ECEC7D8272268FB083ED7827DD781EBBCAE480F94ECB5DD4EB156DBF6240E7E01A24E634BED7993EF50622444D3ABBDD07AE8B250E0727B6E2F6EAE0921386E9AF9B7F6771C9DABFC059CF31AF97CC705F2F94624F41D563639E2";

Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("globalUser");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
