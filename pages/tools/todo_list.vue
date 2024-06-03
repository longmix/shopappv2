<template>
    <!-- 这里写给view方便vue的绑定操作 -->
    <view>
       
         <!-- 内容区 -->
         <view class="content">
			 
			 <view v-if="todolist != ''">
			 
				 <!-- 在这里遍历的index，在这个框内都可以用index -->
				 <view class="card" v-for = "(item,index) in newTodos" :key = "item.id" >
					 <view class="card-content">
						 <view class="card-content-inner">
							 <!-- id这里拿不到？？可以的，记得写上item.id -->
							 <p :style="{textDecoration: item.text_decoration, color:item.font_color}">
								{{index + 1}}、{{item.task}}
							</p>
						 </view>
						 <!-- 按钮 -->
						 <view class="btn-box">
							 <p>
								 <button class="button button-success  icon " 
								 :class = "{'button-fill': item.changeFlag}"
								 @click = "changeTheFlag(index)"
								 style="width: 90rpx;height: 50rpx;line-height: 50rpx;text-align: center;"
								 >完成
								</button>
							</p>
							 <p><button class="button button-danger icon" 
							   @click = "check(index ,item)" 
							   style="width: 90rpx;height: 50rpx;line-height: 50rpx;text-align: center;"
							   >删除</button></p>
						 </view>
					 </view>
			
				 </view>
				 
			 </view>			 
			 <view v-else style="text-align: center;">
				 <image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_order.png" 
					style="width: 250rpx; margin-top: 200rpx;" mode="widthFix"></image>
				 <p style="color: #555555;">空空如也，快来新增吧！</p>
			 </view>
			 			 
			 
			 <view v-show="show_or_not" style="text-align: center;">
			 				 <image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_order.png" style="width: 750rpx;height: 750rpx;"></image>
			 				 <p style="color: #555555;">空空如也，快来新增吧！</p>
			 </view>
			 <!-- <view @click = "remove_local">清除</view> -->
			 
        
         </view>
		 
		 <!-- 右下角悬浮的新增按钮 -->		 
		 <view style="position: absolute; bottom: 180rpx; right: 10rpx; width: 200rpx;"
		 				@click = "openEditFlag">
			 <button style="height: 60rpx;display: flex;align-items: center;justify-content: center;border: 2rpx solid #0EAEED;background-color: #fff;">
				<text style="color: #0EAEED;"> 新增</text>
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiahao01.png" style="width: 40rpx;height: 40rpx;margin-left: 6rpx;"></image>
			</button>		 				
		 </view>
		 
         <!-- 底部区 -->
         <footer>
             <view class="low-box" >
              <ul>
                  <li
                  v-for = "item in tabBars"
                  :key = "item.id"
                  class = "button"
                  :class = "[item.className, list_type_id === item.id ? 'button-fill':'']"
                  @click = "changeType(item.id)"
                  >
                  {{ item.type }}
                 </li>
                 
              </ul>
             </view>
         </footer>
		 
        
         <!-- 添加任务框 -->
         <view class="add-task" v-if = "editFlag">
             <input v-model = "val" type="text" placeholder="请输入新的任务…" style="background-color: #fff;">
             <button class="button button-success button-fill" @click = "closeEditFlag">取消</button>
             <button class="button button-danger button-fill" @click = "commitTask" >确定</button>
        
         </view>
        
         <!-- 询问是否删除框 -->
         <view class="remove-box" v-if = "removeFlag" 
        >
             <p>当前任务还未完成，确定要删除吗？</p>
             <button class="button button-danger button-fill" 
             @click = "closeRemoveFlag">取消</button>
             <button class="button button-success button-fill" 
             @click = "removeConfirm">确定</button>
        
         </view>
        

    </view>
</template>
<script>
	export default {
	data(){
		return{
			todolist: null,
			
			index:0,
				
			 // 底部得数组渲染出来
			 tabBars: [
			     {
			         id: 1,
			         type: '全部',
				
			     },
			     {
			         id: 2,
			         type: '已完成',
			         className: 'button-success'
			     },
			     {
			         id: 3,
			         type: '未完成',
			         className: 'button-danger'
			     }
			 ],
			 editFlag: false,
			 
			// val = '',这样写是错的！
			 val: '',
			 removeFlag: false,
			 activeIndex: 0,
			 
			 // 这里容易忘记定义这个变量
			 list_type_id: 1,
			 
			 activeItem:null,
			 show_or_not:false
		}
	    
	},
	onLoad:function(){
		var that = this;
		
		that.todolist = that.scan_task_list_get();
		
		console.log('当前任务列表：', that.todolist);
		
		// if(that.todolist == null){
		// 	 this.todolist.length = 0;
		// }
	},
	
	onPullDownRefresh() {
	
		console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
	
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading'
		});
		
		
		setTimeout(function() {
			uni.stopPullDownRefresh();
		
			uni.hideToast();
		
		}, 1000);
		
	},
	
	computed: {
		newTodos (){
			var that = this;
		 
			console.log('newTools change type ', this.list_type_id);
			
			if(!this.todolist){
				return;
			}
		 
			// 从已有得todoslist数据中，挑选出来已完成和未完成，这就是计算
			switch(this.list_type_id){
				 case 1:	// All
					 return this.todolist;
					 break;
				 case 2:	// Finished
					 // this.todolist判断changeflag，找到changeflag为true
					 // 这时的filter过滤器是符合条件的重新创建一个新的数组
					 return this.todolist.filter( item => item.changeFlag);
					 
					 if(this.todolist != ''){
						that.show_or_not = false;
					 }
					 else{
						 that.show_or_not = true;
					 }
					 
					 break;
				 case 3:	// Unfinish
					 return this.todolist.filter(item => !item.changeFlag);
					 break;
				 default:
					 return this.todolist;
					 break;
			}
		}
	},
	
	methods: {
		
		scan_task_list_add: function (local_data) {
			console.log("准备任务列表：" ,local_data);
			
			var scan_task_list = this.scan_task_list_get();
			
			if(!scan_task_list){
				scan_task_list = [];
			}
			
			
			console.log('scan_task_list此时的值为:',scan_task_list);
			
			scan_task_list.push(local_data);
			
			var renwu_list_str = JSON.stringify(scan_task_list);
					   
			//缓存返回数据
			uni.setStorageSync("scan_task_list", renwu_list_str);
			
			
			
			this.todolist = scan_task_list;
			console.log('111' ,this.todolist);
			
					   
		},
		
		scan_task_list_get: function () {
			//缓存返回数据
			var scan_task_list_str = uni.getStorageSync("scan_task_list");
					   
			//console.log("获取小程序用户数据：" + user_info_str + '333333333');
					   
			if (!scan_task_list_str) {
				return scan_task_list_str;
			}
					   
			return JSON.parse(scan_task_list_str);
		},
		
		remove_local:function(){
			
			uni.clearStorageSync();
			console.log('todo_list里面的值为:',this.todolist);
			
		},
	  // 任务完成时改变样式
	  changeTheFlag(index){ //这里的index是要当作变量来用的
				if(!this.todolist){
					return;
				}
			
	         
	        this.todolist[ index ].changeFlag = ! this.todolist[ index ].changeFlag
	         // 因为有好多个，要确定是数组里的哪一个数据
			 
			if(this.todolist[index].changeFlag){
				 // card-content-inner 这个class下的p的内容添加删除线，字体变为灰色
				 this.todolist[ index ].text_decoration = 'line-through';
				 this.todolist[ index ].font_color = '#a2a2a2';
			}
			else{
				 // 如果没有完成，则恢复没原色
				 this.todolist[ index ].text_decoration = 'none';
				 this.todolist[ index ].font_color = '#333333';
			}
			 
			 
			//保存数据
			uni.setStorageSync('scan_task_list' , JSON.stringify(this.todolist));
			
			
	    },
	    
	    // 弹出添加框
	    openEditFlag () {
	         this.editFlag = true 
	         this.val = ''   //这个加的真好，下次打开的时候就没有之前输入过的内容了
	    },
		
	    // 关闭添加框
	    closeEditFlag(){
	         this.editFlag = false
	    },
		 
	    // 提交添加新地任务
	    // 这里地val就是input里输入地内容	
	    commitTask(){ 
			 //为什么这里不用写val这个参数呢？
	         // 这里要写符合上面数据格式的输入
	         //这里加入了 如果是没输入内容的话，确定也是直接关掉
			 
			 var that = this;
			 
	         if(this.val != ''){
				 
				 uni.setStorage({
				 	key:'local_data',
					data:{
						'id':this.todolist.length + 1,
						'task':this.val,
						'changeFlag': false,
						'text_decoration':'none',
						'font_color':'#333333'
					},
					success() {
						console.log('userInfo储存成功');
					}
				 				
				 })				 
				 
				 
				 uni.getStorage({
				 	key:'local_data',
				 	success(res) {
						
						
				 		that.local_data = res.data;
						
				 		console.log('获取单个任务成功：', that.local_data);
						
						
						
						that.scan_task_list_add(that.local_data);
				 		
				 	}
				 })
				 
				 
				 
				 that.todolist = that.scan_task_list_get();
				 // uni.reLaunch({  
				 //   url: '/pages/tools/todo_list'  
				 // });
				 
				 console.log('45645645bendi',that.todolist);
				 

			}
			// closeEditFlag() 方法里面不能这么嵌套上面的方法
			this.closeEditFlag()//这样写就可以val:
	        
	    },
	     //数组删除 splice,前面忘记定义这个以为是jqurey可以直接来，结果remove没能识别
	     //    splice用于删除数组中的元素
	   //   remove ( index,item) {
	   //       // 数组删除   splice
	   //       uni.removeStorageSync('local_data', index);
			 // console.log('12121',this.todolist.length);
	   //     },
	     // 删除任务
	    check ( index,item) {
			
			console.log('当前的index为' ,index);
			console.log('当前的item为' ,item);
			
			console.log('当前的this.activeItem为' ,this.activeItem);
			// if(!this.activeItem){
			// 	return;
			// }
			 
			 var that = this;
			 
	         // 删除前先判断changeflag
			 
	         if(  this.newTodos[index].changeFlag) {
				 
	           // 真   直接删除
			   
			   var current_item = item;
				console.log('删除的一项', current_item);
				
				  
				uni.removeStorageSync('scan_task_list');
				
				this.todolist = this.todolist.filter((item) => item  !== current_item);
				
				uni.setStorageSync('scan_task_list' , JSON.stringify(this.todolist));
				  
				//that.todolist = that.scan_task_list_get();
				  
				//uni.removeStorageSync('local_data', this.activeIndex);
				console.log('当前的todolist内容为', this.todolist);
				console.log('删除')
	
	         } else {
	           // 假   显示询问框
	           this.activeIndex = index 
			   this.activeItem = item;
	           //为什么这时的index拿不到呢？因为不在那个遍历数组的view里面了吗？
	           this.openRemoveFlag()
	         }
	       },
	
	     // 删除任务
	     removeConfirm () {
			 var that = this;
			console.log('删除的一项', this.activeItem);

			uni.removeStorageSync('scan_task_list');
			this.todolist = this.todolist.filter((item) => item  !== this.activeItem);
			uni.setStorageSync('scan_task_list' ,JSON.stringify(this.todolist));
			// uni.getStorage({
			// 	key:'scan_task_list',
			// 	success(res) {
									
									
			// 		that.local_data = res.data;
			// 		console.log('获取成功',that.local_data);
					
					
			// 	}
			// })
			console.log('当前的todolist内容为', this.todolist);
			
	         this.closeRemoveFlag()
	       },
	     // 点击删除时出来的询问框
	     openRemoveFlag () {
	         this.removeFlag = true 
	         
	       },
	     // 点击取消时关闭删除框
	     closeRemoveFlag(){
	         this.removeFlag = false
	     },
	     // 按照分类来分类显示！！完全没有思路，感觉应该在是否打勾那里入手
	     
	    changeType ( list_type_id ) {
			console.log('改变列表类型为：', list_type_id);
			
	        this.list_type_id = list_type_id
	    }
	     
	},
	
	     
}

</script>
<style>
	@import url("static/todo_list/css/base.css");
	@import url("static/todo_list/css/index.css");
	@import url("static/todo_list/css/sm.min.css");
	@import url("static/todo_list/css/sm-extend.min.css");
	
	.header_title{
		border:2rpx solid #cccccc;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
	}
	page{
		background-image: url("https://yanyubao.tseo.cn/Tpl/static/images/bg001.jpg");
	}
	

</style>

