<template>
<transition name="move">
<div class="food" v-show="showFlage" ref="food">
    <div class="food-container">
        <div class="image-header">
            <img :src="food.image">
            <i class="icon-arrow_lift" @click="hide"></i>
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
                <cartcontrol v-on:cartadd="cartaddEvent" :food="food"></cartcontrol>
            </div>
            <transition name="fade">
                <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
            </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
            <div class="title">商品信息</div>
            <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect
                :select-type="selectType"
                :only-content="onlyContent"
                :desc="desc"
                :ratings="food.ratings"
                v-on:select="selectEvent"
                v-on:toggleContent="toggleContentEvent">
            </ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li v-for="rating in food.ratings"
                        class="rating-item"
                        v-show="newShow(rating.rateType,rating.text)">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img class="avatar" width="12" height="12" :src="rating.avatar"/>
                        </div>
                        <div class="time" v-text="formatDate(rating.rateTime)"></div>
                        <p class="text">
                            <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                            {{rating.text}}
                        </p>
                    </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
        </div>
    </div>
</div>
</transition>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import {formatDate} from 'common/js/date'

/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlage: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }

        }
    },
    methods: {
        show() {
            this.showFlage = true
            this.selectType = ALL
            this.onlyContent = true
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        hide() {
            this.showFlage = false
        },
        addFirst(event) {
            if (!event._constructed) {
                return
            }
            this.$emit('cartadd', event.target)
            Vue.set(this.food, 'count', 1)
        },
        cartaddEvent(target) {
            this.$emit('cartadd', target)
        },
        selectEvent(type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        toggleContentEvent() {
            this.onlyContent = !this.onlyContent
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        newShow(type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
}
</script>

<style type="text/less" lang="less">
.food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transition: all .2s linear;
    transform: translate3d(0,0,0);
    &.move-enter, &.move-leave-active {
        transform: translate3d(100%,0,0);
    }
    .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        i{
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 0;
            padding: 10px;
            font-size: 20px;
            color: #fff;
        }
    }
    .content{
        padding: 18px;
        position: relative;
        .title{
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: #333;
        }
        .detail{
            margin-bottom: 18px;
            line-height: 10px;
            font-size: 0;
            .sell-count,.rating{
                font-size: 10px;
                color: rgb(147,153,159);
            }
            .sell-count{
                margin-right: 12px;
            }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now{
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper{
            position: absolute;
            right: 18px;
            bottom: 18px;
        }
        .buy{
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10px;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 10px;
            border-radius: 12px;
            color: #fff;
            background: rgb(0, 160, 220);
            opacity: 1;
            transition: all 0.2s;
            &.fade-enter, &.fade-leave-active{
                opacity: 0;
            }
        }
    }
    .info{
        padding: 18px;
        .title{
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text{
            font-size: 12px;
            line-height: 24px;
            padding: 0 8px;
            color: rgb(77, 85, 93);
        }
    }
    .rating{
        padding-top: 18px;
        .title{
            margin-left: 18px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(77, 85, 93);
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                position: relative;
                padding: 16px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .user{
                    position: absolute;
                    right: 0;
                    top: 16px;
                    font-size: 0;
                    line-height: 12px;
                    .name{
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: middle;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .avatar{
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
                .time{
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .text{
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .icon-thumb_up,.icon-thumb_down{
                        margin-right: 4px;
                        line-height: 16px;
                        font-size: 12px;
                    }
                    .icon-thumb_up{
                        color: rgb(0, 160, 220);
                    }
                    .icon-thumb_down{
                        color: rgb(147, 153, 159);
                    }
                }
            }
            .no-rating{
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}
</style>