var areaData = [],
	getProvince = function(){
		$.ajax({
			url:'/address/getProvinces.action',
			dataType:'json',
			success:function(data){
				var pIndex = 0;
				for(var key in data){
					areaData.push({
						id:key,
                        parentId:'0',
						name:data[key + ''],
						children:[]
					});
					getCity(key,pIndex);
					pIndex ++;
				}
			}
		})
	},
	getCity = function(pId,pIndex){
		$.ajax({
			url:'/address/getCitys.action',
			dataType:'json',
			data:{
				provinceId:pId
			},
			success:function(data){
				var cityData = [],cIndex = 0;
				for(var key in data){
					cityData.push({
						id:key,
                        parentId:pId,
						name:data[key + ''],
						children:[]
					});
					getCounty(key,pIndex,cIndex);
					cIndex ++;
				}
				cityData.length&&(areaData[pIndex].children = cityData);
			}
		})
	},getCounty = function(cId,pIndex,cIndex){
		$.ajax({
			url:'/address/getCountys.action',
			dataType:'json',
			data:{
				cityId:cId
			},
			success:function(data){
				var countyData = [];
				for(var key in data){
					countyData.push({
						id:key,
                        parentId:cId,
						name:data[key + '']
					})
				}
				countyData.length&&(areaData[pIndex].children[cIndex].children = countyData);

			}
		})
	};
getProvince();
setTimeout(function(){
	console.log(JSON.stringify(areaData));
},20000);//延时时间自己定
