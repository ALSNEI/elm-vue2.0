<template>
	<div class="cartcontrol">
		<transition name="move" >
			<div class="cart-decrease"  @click.stop.prevent = "decreaseCart($event)" v-show="food.count>0">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent ="addCart($event)"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import bus from 'components/bus/bus'

export default{
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addCart(event){
			if(!event._constructed){
	  			return;
	  		}
			if(!this.food.count){
				// this.food.count = 1;
				Vue.set(this.food,'count',1)//添加属性
			}else{
				this.food.count ++;
			}
			bus.$emit("addcart",event.target);
		},
		decreaseCart(event){
			if(!event._constructed){
	  			return;
	  		}
	  		if(this.food.count){
	  			this.food.count--;
	  		}
		}
	},
	// created() {
	// 	console.log(this.food)
	// }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size:0
	.cart-decrease
		display:inline-block
		padding:6px
		transition: all 0.4s linear
		.inner
			display:inline-block
			transition: all 0.4s linear
			line-height:24px
			font-size:24px
			color:rgb(0,160,220)
		&.move-enter-active
			opacity:1
			transform:translate3D(0,0,0)
			.inner
				transform:rotate(0)
		&.move-enter,&.move-leave-active
			opacity:0
			transform:translate3D(24px,0,0)
			.inner
				transform:rotate(180deg)
	.cart-count
		display:inline-block
		vertical-align:top
		width:12px
		padding-top:6px
		line-height:24px
		text-align:center
		font-size:10px
		color:rgb(147,153,159)
	.cart-add
		display:inline-block
		padding:6px
		line-height:24px
		font-size:24px
		color:rgb(0,160,220)
		

</style>