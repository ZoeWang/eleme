<template>
<div class="cartcontrol">
    <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"  @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
</div>
</template>

<script type="text/javascript">
    import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return
                }

                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                } else {
                    this.food.count ++
                }

                this.$emit('cartadd', event.target)
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    this.food.count --
                }
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .cartcontrol{
        font-size: 0;
        .cart-decrease,.cart-add{
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }
        .cart-count{
            display: inline-block;
            font-size: 12px;
            vertical-align: top;
            width: 12px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-decrease{
            transition: all .3s linear;
            transform:translate3d(0,0,0) rotate(0);
            &.move-enter{
                opacity: 0;
                transform:translate3d(24px,0,0) rotate(180deg);
            }
            &.move-leave-active{
                opacity: 0;
                transform:translate3d(24px,0,0) rotate(180deg);

            }
        }
    }
</style>