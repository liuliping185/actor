function applicationRoles(){
    window.location.href = "roleInfo.html";
}


 /**
  * @param fromSelectId option移动起始select标签id
  * @param toSelectId option移动目的地select标签id
  * @param addOrNot boolean类型——true表示当前进行的是添加操作，否则是删除操作
  * @param moveAllOrNot boolean类型——true表示当前进行的是“全部”操作，否则当前进行的不是“全部”操作
  */
 function moveOptions(fromSelectId, toSelectId, addOrNot, moveAllOrNot){
     var fromObject = document.getElementById(fromSelectId);
     var toObject = document.getElementById(toSelectId);
     if(fromObject.options.length == 0){
         if(addOrNot){
             alert("没有找到可添加的选项！");
         }else{
             alert("没有找到可删除的选项！");
         }
         return;
     }

     if(fromObject.selectedIndex == -1 && moveAllOrNot == false){
         if(addOrNot){
             alert("请先选择要添加的选项！");
         }else{
             alert("请先选择要删除的选项！");
         }
         return;
     }

     var toSelectOptionsList = new Array(toObject.options.length);//存放option移动目的地select标签所有option选项
     var toSelectOptionPointer = 0;
     for(; toSelectOptionPointer < toObject.options.length; toSelectOptionPointer ++){//将option移动目的地原有option选项存放到toSelectOptionsList数组中
         if(toObject.options[toSelectOptionPointer] != null){
             toSelectOptionsList[toSelectOptionPointer] = new Option(toObject.options[toSelectOptionPointer].text, toObject.options[toSelectOptionPointer].value);
         }
     }

     for(var i = 0; i < fromObject.options.length; i ++){
         if(fromObject.options[i] != null && (fromObject.options[i].selected == true || moveAllOrNot)){//将新添加的option选项存放到toSelectOptionsList数组中
             toSelectOptionsList[toSelectOptionPointer] = new Option(fromObject.options[i].text, fromObject.options[i].value);
             toSelectOptionPointer ++;
         }
     }

     for(var i = 0; i < toSelectOptionsList.length; i ++){//重新整合option移动目的地select标签的option选项，以使新添加的显示出来
         if(toSelectOptionsList[ i ] != null){
             toObject.options[ i ] = toSelectOptionsList[ i ];
         }
     }

     for(var i = fromObject.options.length - 1; i >= 0; i --){//重新整合option移动起始select标签的option选项，以便去掉删除的option选项
         if(fromObject.options[i] != null && (fromObject.options[i].selected == true || moveAllOrNot)){
             fromObject.options[i] = null;
         }
     }
 }

 function getSelectedValues(){
     var selectedValues = "";
     var rightSelectObject = document.getElementById("rightSelect");
     for(var i=0; i<rightSelectObject.options.length; i++){
         selectedValues = rightSelectObject.options[i].value + ',' + selectedValues;
     }
     selectedValues = selectedValues.substring(0, selectedValues.lastIndexOf(','));
     if(selectedValues == ""){
         alert("你没有选择任何选项！！！");
     }else{
         alert("你选中的值为：" + selectedValues);
     }
 }
