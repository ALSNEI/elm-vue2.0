<template>
  <div class="header">
	<div class="content-wrapper">
		<div class="avatar">
			<img width="64" height="64" :src="seller.avatar" alt="头像">
		</div>
		<div class="content">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="description">
				{{seller.description}}/{{seller.deliveryTime}}分钟送达
			</div>
			<div v-if="seller.supports" class="supports">
				<!-- 一开始传递seller数据时为空,会报错找不到为0的属性,所以用v-if-->
				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
				<span class="text">{{seller.supports[0].description}}</span>
			</div>
		</div>
		<div v-if="seller.supports" class="support-count" @click="showDetail">
			<span class="count">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	</div>
	<div class="bulletin-wrapper" @click="showDetail">
	<!-- 2.将两个span标签贴近不留间隙解决两个标签之间的留白问题 -->
		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
	</div>  
	<div class="background">
		<img :src="seller.avatar" width="100%" height="100%">
	</div>

	<transition name="fade">
	<div v-show="detailShow" class="detail">
		<div class="detail-wrapper clearfix">
			<div class="detail-main">
				<h1 class="name">{{seller.name}}</h1>
				<div class="star-wrapper">
					<star :size="48" :score="seller.score"></star>
				</div>
				<div class="title">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
				<div class="title">
					<div class="line"></div>
					<div class="text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletin">
					<p class="content">{{seller.bulletin}}</p>
				</div>
			</div>
		</div>
		<div class="detail-close" @click = "hideDetail">
			<i class="icon-close"></i>
		</div>
	</div>
	</transition>
  </div>
</template>

<script>
import star from "components/star/star"
export default {
  name:"header",
  props:{
  	seller:{
  		type:Object
  	}
  },
  data() {
  	return {
  		detailShow:false
  	}
  },
  methods:{
  	showDetail(){
  		this.detailShow = true
  	},
  	hideDetail(){
  		this.detailShow = false
  	}
  },
  created(){
  	this.classMap = ['decrease','discount','guarantee','invoice','special']
  },
  components:{
  	star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";
.header
	position:relative
	/*overflow:hidden解决模糊层渗透出来的问题*/
	overflow:hidden
	color:#fff
	background:rgba(7,17,27,0.5)
	.content-wrapper
		position:relative
		padding:24px 12px 18px 24px
		.avatar
			display:inline-block
			vertical-align:top
			img
				border-radius:2px
		.content
			display:inline-block
			margin-left:16px
			.title
				margin:2px 0 8px 0
				.brand
					display:inline-block
					vertical-align:top
					width:30px
					height:18px
					bg-image('brand')
					background-size:30px 18px
					background-repeat:no-repeat
				.name
					margin-left:6px
					font-size:16px
					line-height:18px
					font-weight:bold
			.description
				margin-bottom:10px 
				line-height:12px
				font-size:12px
			.supports
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					margin-right:4px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.text
					line-height:12px
					font-size:12px
					vertical-align:top
		.support-count
			position:absolute
			right:12px
			bottom:18px
			padding:0 8px
			height:24px
			line-height:24px
			border-radius:14px
			background:rgba(0,0,0,0.2)
			text-align:center
			.count
				vertical-align:top
				font-size:10px
			.icon-keyboard_arrow_right
				line-height:24px
				font-size:10px
	.bulletin-wrapper
		position:relative
		height:28px
		line-height:28px
		padding:0 22px 0 12px
		white-space:nowrap
		overflow:hidden
		/*1.父级设置字体为0,解决图片和字体之间的留白问题,需要的额留白间隙通过margin解决,但是会导致text-overflow:ellipsis超出省略无效*/
		/*font-size:0*/
		text-overflow:ellipsis
		background:rgba(7,17,27,0.2)
		.bulletin-title
			/*解决span不可以设置宽高*/
			display:inline-block
			/*子级都设置顶部对齐*/
			vertical-align:top
			/*由于字体高度和图片不一致,所以计算偏移高度(28-12)/2*/
			margin-top:8px
			width:22px
			height:12px
			bg-image('bulletin')
			background-size:22px 12px
			background-repeat:no-repeat
		.bulletin-text
			font-size:10px
			vertical-align:top
			margin:0 4px
		.icon-keyboard_arrow_right
			position:absolute
			font-size:10px
			right:12px
			top:8px
	.background
		position:absolute
		top:0
		left:0
		width:100%
		height:100%
		z-index:-1
		filter:blur(10px)
	.detail
		position:fixed
		z-index:100
		top:0
		left:0
		width:100%
		height:100%
		overflow:auto
		transition:all .5s
		/*iphone手机专有的背景模糊特性,安卓没有*/
		backdrop-filter:blur(10px)
		background:rgba(7,17,27,0.8)
		&.fade-enter-active
			opacity:1
			background:rgba(7,17,27,0.8)
		&.fade-enter,&.fade-leave-active
			opacity:0
			background:rgba(7,17,27,0)
		.detail-wrapper
			min-height:100%
			width:100%
			.detail-main
				margin-top:64px
				padding-bottom:64px
				.name
					line-height:16px
					text-align:center
					font-size:16px
					font-weight:700
				.star-wrapper
					margin-top:10px
					padding-bottom:12px
					text-align:center
				.title
					display:flex
					width:80%
					margin:28px auto 24px auto
					.line
						flex:1
						position:relative
						top:-6px
						border-bottom:1px solid rgba(255,255,255,0.2)
					.text
						padding:0 12px
						font-weight:700
						font-size:14px
				.supports
					width:80%
					margin:0 auto
					.support-item
						padding:0 12px 
						margin-bottom:12px
						font-size:0
						&:last-child
							margin-bottom:0
						.icon
							display:inline-block
							width:16px
							height:16px
							vertical-align:top
							margin-right:6px
							background-size:16px 16px
							background-repeat:no-repeat
							&.decrease
								bg-image('decrease_2')
							&.discount
								bg-image('discount_2')
							&.guarantee
								bg-image('guarantee_2')
							&.invoice
								bg-image('invoice_2')
							&.special
								bg-image('special_2')
						.text
							line-height:16px
							font-size:12px
				.bulletin
					width:80%
					margin:0 auto
					.content
						padding:0 12px 
						line-height:24px
						font-size:12px
		.detail-close
			position:relative
			width:32px
			height:32px
			margin:-64px auto 0 
			clear:both
			font-size:32px

</style>
