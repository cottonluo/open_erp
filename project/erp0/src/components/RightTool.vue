<template>
	<div class="rightTool" :class="{rightToolIn: isIn}">
		<header class="rightToolHeader">
			<span>{{headTitle}}</span>
			<div class="arrowImg" @click="arrowClick">
				<img :src="arrowImg" />
			</div>
		</header>
		<section class="rightToolContent">
			<slot name="rightToolTab"></slot>
			<ul class="rightToolList">
				<li class="rightToolListLi listActive">
					水雨涝情
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
let arrowLImg = 'static/img/arrowL.png';
let arrowRImg = 'static/img/arrowR.png';
export default {
	props: ['headTitle'],
	data() {
		return {
			isIn: false,
			arrowImg: arrowRImg
		}
	},
	methods: {
		arrowClick: function () {
			if (this.isIn) {
				this.arrowImg = arrowRImg;
			} else {
				this.arrowImg = arrowLImg;
			}
			this.isIn = !this.isIn
		},
		showRightTool: function () {
			if (this.isIn) {
				this.isIn = false;
			}
		}
	}
}

</script>


<style scoped>
.rightTool {
	width: 330px;
	position: fixed;
	top: 120px;
	right: 0;
	z-index: 2;
	transition: all .8s ease-in-out;
}

.rightToolIn {
	transform: translate3D(100%, 0, 0);
}

.rightToolHeader {
	width: 100%;
	height: 32px;
	background-color: #008cee;
	color: white;
	line-height: 32px;
	font-size: 18px;
	text-align: center;
	position: relative;
}

.arrowImg {
	width: 35px;
	height: 32px;
	position: absolute;
	top: 0;
	left: -35px;
	background-color: white;
	box-sizing: border-box;
	border: 1px solid #e6e5e6;
	cursor: pointer;
}

.arrowImg>img {
	width: 100%;
	height: 100%;
}

.rightToolContent {
	width: 100%;
	height: 585px;
	border: 1px solid #008cee;
	border-radius: 0 0 0 5px;
	background-color: white;
	display: flex;
	position: relative;
}

.rightToolList {
	position: absolute;
	top: 20px;
	left: -35px;
}

.rightToolListLi {
	padding: 10px;
	width: 35px;
	height: 94px;
	box-sizing: border-box;
	border: 1px solid #008cee;
	background-color: white;
	border-radius: 5px 0 0 5px;
	cursor: pointer;
	color: #008cee;
	margin-top: -1px;
	font-size: 18px;
}

.listActive {
	color: white;
	background-color: #008cee;
}
</style>