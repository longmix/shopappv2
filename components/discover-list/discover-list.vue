<template>
	<view>
		<view class="list-box clearfix" 
			v-if="faquanList != ''"
			v-for=" (item,idx) in faquanList" :key="idx">
		        <view class='list-con'> <!-- 001 -->
		            <image class="list-avatar" :src="item.headlogo" ></image> 
		            <view class="list-item">  <!-- 002 -->
		                <view :data-id="item.faquanid">  <!-- 003 -->
		                    <view class="list-type">
		                      <view class="list-zan-a" v-if="is_my_discover != 1">
		
		                        <image class='list-zan' :data-faquanid='item.faquanid' :data-index='idx' @tap="fanquaDianzan" 
									:src="faquanList[idx].has_like == 0 ? '../../static/img/help/dianzan_grey.png' : '../../static/img/help/dianzan_red.png'"></image>
		                        <view style="color:#707070;">{{item.like_num}}</view>
		
		                        <image @tap="fanquanCollect" :data-faquanid='item.faquanid' :data-index='idx' class='list-zan' 
									:src="faquanList[idx].has_collect == 0 ? '../../static/img/help/star_off.png' : '../../static/img/help/star_on.png'"></image>
		                        <view style="color:#707070;">{{item.collect_num}}</view>
		
		                      </view>
		
		                      
		
		                    </view>
		                    <view class="list-name" :data-id="item.faquanid">{{item.username}}</view>     
						</view>  <!-- End of 003  -->
					</view>
					<view>
						<view>  <!-- 003 -->
									  
									  
		                    <text class="list-des" @tap="copyText" :data-text="item.text" :data-id="item.faquanid">{{item.text}}</text>
		
		                    <view v-if="item.type == 0">  
		                         <image v-for="(item2,index2) in item.img_or_video_list" :key="index2" lazy-load="true"  @tap='bigImg' mode="aspectFill" 
									:data-index="idx" :data-index2="index2"  class="list-image"  :src="item2.url"  :data-id="item.faquanid"></image>                        
		                    </view>
		
		                    <view v-else>
		                        <block v-for="(item2,index2) in item.img_or_video_list" :key="index2">
									<video v-if="current_playing_videoid == item2.imgid"
										class="video_list_style"
										:data-id="item2.imgid" :data-index="item2.index"
										:id="'myvid_'+item2.imgid"
										@play888='start_and_stop_other_videos' 
										@tap888='start_and_stop_other_videos' 
										:src="item2.url"  
										:poster='item2.video_img'
										show-fullscreen-btn
										autoplay
										controls
										@loadedmetadata="videometa_handle"
										:style="{width:videometa_width_height_list[item2.index][0] + 'rpx',height:videometa_width_height_list[item2.index][1] + 'rpx'}"
										>
									
									</video>
									<view v-else class="" @tap="start_and_stop_other_videos(item2.imgid)"> <!-- 封面图片层 -->
										<view class="i_box"
										:style="{width:videometa_width_height_list[item2.index][0] + 'rpx',height:videometa_width_height_list[item2.index][1] + 'rpx'}">
											<image class="video_img" 
											:src="item2.video_img" 
											:style="{width:videometa_width_height_list[item2.index][0] + 'rpx',height:videometa_width_height_list[item2.index][1] + 'rpx'}"
											mode="widthFix"
											></image>
											<view class="video_logo cuIcon-playfill">
												<image src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/play_white.png"></image>
											</view>
										</view>
									</view>
								</block>
								
		                    </view>
		                    
		                </view>  <!-- End of 003  -->
		                
		                <view class="pb-time">{{item.createtime}}</view>
						
						<view style="display:block; float:right;height: 60px;margin-top: 30rpx">
							<image class='list-zan' style="float:left;" 
								:data-faquanid='item.faquanid' :data-index='idx' @tap="fanquaJubao"
								src="../../static/img/help/jubao.png"></image>
							<view style="color:#707070;float: left;">举报</view>
						</view>
						
		
		                <block v-if="is_my_discover_collection || is_my_discover">
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;">
		                      
		                      <block  v-if="(faquan_tag_status == 1) && (item.tag_count > 0) ">
		                        <view><text style="font-weight:bold;">标签</text>  
		                          <block v-for="(item,index) in tag" :key="index"  :data-index="index"
		                              style="font-size: 26rpx;height: 30rpx;line-height: 30rpx;"><text style="margin-left:20rpx;">{{item3}}</text></block>
		                        </view>
		                        
		                      </block>
		                      
		                  </view>
		                </block>
						
		                <block v-if="is_my_discover">
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;">
		                      <view><text style="font-weight:bold;">点赞</text> <text style="margin-left:20rpx;">{{item.like_num}}</text>
		                      </view>  
		                  </view>
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;">
		                      <view><text style="font-weight:bold;">收藏</text> <text style="margin-left:20rpx;">{{item.collect_num}}</text>
		                      </view>  
		                  </view>
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;">
		                      <view><text style="font-weight:bold;">状态</text> <text style="margin-left:20rpx;">{{item.status_str}}</text>
		                      </view>  
		                  </view>
		
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;" v-if="item.status != 1">
		                      <view><text style="font-weight:bold;">备注</text> <text style="margin-left:20rpx;">{{item.memo}}</text>
		                      </view>  
		                  </view>
		
		                  <view class="" style="margin-left: 0;height: 40rpx;line-height: 40rpx;font-size: 26rpx;text-align: left;color:#666;">
		                      <view><text style="font-weight:bold;">操作</text>
		                        <block v-if="item.status == 4">
		                        <text style="margin-left:20rpx; color:blue;" :data-faquanid='item.faquanid' data-status='1' @tap="change_faquan_status">显示</text>
		                        </block>
		                        <block v-if="item.status == 1">
		                          <text style="margin-left:20rpx; color:blue;" :data-faquanid='item.faquanid' data-status='4' @tap="change_faquan_status">隐藏</text>
		                        </block>
		
		                        <text style="margin-left:40rpx; color:blue;" :data-faquanid='item.faquanid' data-status='3' @tap="change_faquan_status">删除</text>
		                      </view>  
		                  </view>
		
		                </block>
		                <block v-if="(is_my_discover_collection != 1) && (is_my_discover != 1)">
		                
		
		                  <block  v-if="(faquan_tag_status == 1) && (item.tag_count > 0) ">
		                    <view class="list-botton tab-con clearfix" style="margin-left: 0;height: 60rpx;line-height: 60rpx;">
		                      <view class=""  v-for='(item,index) in tag' :key="index"  :data-index="index"
		                          style="font-size: 26rpx;height: 30rpx;line-height: 30rpx;">{{item3}}</view>
		                    </view>
		                  </block>
		
		                </block>
		
		
		
		
		            </view>  <!-- End of 002  -->
		          </view> <!-- End of 001  -->
		        
		          <view style="clear:both;"></view>
		
		           <!-- <view v-if="!is_my_discover_collection && !is_my_discover" class="list-address fz-10 m-t-5">
		              <view @tap="oneClickSave" class='download-con' 
		                :data-index='idx' :data-type='item.type' 
		                :style="{display:faquan_one_click_to_save_show}">
		                <image class="download-img" src="../../static/img/download.png"></image>一键保存{{item.type}}</view>
		                <view class="share_box" >
		                <image class="share-img" src="../../static/img/share.png"></image>
		                  <view class="share_hide">
		                    
		                      <view style='width:74rpx;'>分享</view>
		                    <button class="share" :data-id="item.faquanid" open-type="share"></button> 
		                  </view>
		                </view>
		
		          </view> -->
		
		
		        </view>
	</view>
</template>

<script>
	export default {
		name: "discover-list",
		props: {
			faquanList:'',
			is_my_discover:0,
			is_my_discover_collection:0,
			faquan_tag_status:0,
			disabled:false,
			tag:'',
			videometa_width_height_list:'',
			current_playing_videoid:0
		},
		methods:{
			fanquaDianzan:function(fanquaDianzan){
				this.$emit('fanquaDianzan',fanquaDianzan);
			},
			fanquaJubao:function(fanquaJubao){
				this.$emit('fanquaJubao', fanquaJubao);
			},
			copyText:function(copyText){
				this.$emit('copyText',copyText);
			},
			bigImg:function(bigImg){
				this.$emit('bigImg',bigImg);
			},
			start_and_stop_other_videos:function(e){
				this.$emit('start_and_stop_other_videos',e);
			},
			videometa_handle:function(e){
				this.$emit('videometa_handle', e);
			},
			change_faquan_status:function(e){
				this.$emit('change_faquan_status',e);
			},
			oneClickSave:function(e){
				this.$emit('oneClickSave',e);
			},
			fanquanCollect:function(e){
				this.$emit('fanquanCollect',e);
			},
			click_share_btn:function(e){
				this.$emit('click_share_btn',e);
			},
			img_or_video_download:function(e){
				this.$emit('img_or_video_download',e);
			},
		}
	}
</script>

<style lang="scss">
	.list-box {
	  margin-top: 50rpx;
	  padding:0 5%; 
	  font-size:32rpx;
	  border-bottom:16rpx solid #eee;
	  padding-bottom:2rpx;
	}
	.list-con{
	    border-bottom: 2rpx solid #eee;
	}
	.list-avatar {
	  float: left;
	  width: 30px;
	  height: 30px;
	  border-radius: 50%;
	  margin-right: 10px;
	}
	.list-item {
	  position: relative;
	  padding: 10px 0;
	  width:90%;
	  margin-left:12%;
	}
	
	.list-item::last {
	  border: none;
	}
	.list-type {
	  position: absolute;
	  right: 0;
	  top: 10px;
	  color: #bfbfbf;
	  display: flex;
	  font-size:34rpx;
	  align-items:center;
	}
	
	.list-type-money {
	  background: #ffa404;
	  color: #fff;
	}
	.list-zan-a{
	  display: flex;
	  align-items:center;
	  margin-right: 20rpx;
	}
	.list-zan{
	  width: 34rpx;
	  height: 34rpx;
	  margin-left: 20rpx
	}
	.list-name {
	  height: 40rpx;
	  line-height: 40rpx;
	  font-size: 28rpx;
	  color: #6798E9;
	  font-weight: bold;
	  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
	}
	.list-des {
	  margin-top: 10px;
	  line-height: 1.5;
	  color: #444;
	  font-size: 28rpx;
	}
	.list-image {
	  margin-top: 10px;
	  margin-right: 5px;
	  width:190rpx;
	  height: 190rpx;
	}
	.share-img{
	  width:28rpx;
	  height:28rpx;
	}
	.share_box{
	width:100rpx;
	height:60rpx;
	float: right;
	position: relative;
	line-height:60rpx;
	display:flex;
	align-items:center;
	}
	.share_hide{
	  width:62rpx;
	  height:60rpx;
	  position: absolute;
	  overflow: hidden;
	  top: 0;
	  right: 0;
	  color: #333;
	  font-size:28rpx;
	}
	.share_hide image{
	  width: 100%;
	  height: 100%;
	}
	.share{
	  width:70rpx;
	  height:70rpx;
	  position: absolute;
	  top:-5rpx;
	  left:-5rpx;
	  background:transparent;
	}
	.download-img{
	  width:28rpx;
	  height:28rpx;
	  margin-right:10rpx;
	}
	
	.cuIcon-playfill {	    
		position: relative;
	    top: -80rpx;
	    left: 10rpx;
	    width: 60rpx;
	    height: 60rpx;
	}
	.cuIcon-playfill image {
		width: 60rpx;
		height: 60rpx;
	}
	
	.pb-time{
		height: 60rpx;
		line-height: 60rpx;
		margin:20rpx 0;
		float:left;
	}
</style>
