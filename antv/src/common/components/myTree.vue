<template>
  <div>
    <a-tree
      :draggable="draggable"
      :checkable="checkable"
      :checkedKeys="slowCheckedKeys"
      @select="select"
      :tree-data="treeData"
      @drop="drop"
      @check="check"
      :replaceFields="replaceFields"
      :filterTreeNode="filterTreeNode"
      @expand="expand"
      :expanded-keys="expandedKeys"
    ></a-tree>
  </div>
</template>
<script>
export default {
  /**
   * 组件参数
   * @param {*} titleProp 节点的标题的属性名，默认是：title
   * @param {*} keyProp 节点的主键的属性名，默认是：key
   * @param {*} parentKeyProp 节点的上级节点的属性名，默认是：parent
   * @param {*} childProp 节点的子节点属性名，默认是：children
   * @param {*} listType 节点的数据结构：'list'：普通列表集合，'treeList'：树集合，默认是 treeList
   * @param {*} dataSource 数据源，设置后重新渲染树
   * @param {*} maxLevel 最大转化层级，对于 listType='list' 时必须传入
   * @param {*} isRoot 判断是否为根节点，对于 listType='list' 时必须传入
   * @param {*} sort 节点排序方法，不设置则不排序
   * @param {*} draggable 是否可拖拽，默认为false
   * @param {*} checkable 是否在树节点前加复选框，默认为false
   * @param {*} checkedKeys 复选框选中项，当且仅当checkable=true时有效
   * @param {*} expandAll 展开全部项，设置为true时开启全部项，设置为false时关闭全部项，默认为false
   */
  props: [
    "titleProp",
    "keyProp",
    "parentKeyProp",
    "childProp",
    "listType",
    "dataSource",
    "maxLevel",
    "isRoot",
    "sort",
    "draggable",
    "checkable",
    "checkedKeys",
    "expandAll"
  ],
  /**
   * 组件事件
   * select事件，使用 @select="回调函数" 绑定后，每次选中树节点都会触发该事件。
   * drop事件，使用 @drop="回调函数" 绑定后，每次拖动后节点都会触发该事件。
   * check时间，使用 @check="回调函数" 绑定后，每次选择复选框时都触发该时间。
   */
  /**
   * 组件方法（使用ref指定组件名称，使用$refs获取组件就可以调用）
   * keywordSearch方法，该方法根据当前参数进行关键字查询
   * delNode方法，该方法根据传入的key删除节点
   * restoreLastDrag方法，该方法用于还原最近的一次拖拽操作
   */
  data() {
    return {
      treeData: [],
      slowCheckedKeys: [],
      backups: "",
      replaceFields: {},
      expandedKeys: [],
      keyword: ""
    };
  },
  created() {
    this.replaceFields = {
      children: this._childProp,
      title: this._titleProp,
      key: this._keyProp
    };
  },
  computed: {
    _listType() {
      return this.listType === undefined ? "treeList" : this.listType;
    },
    _parentKeyProp() {
      return this.parentKeyProp === undefined ? "parent" : this.parentKeyProp;
    },
    _childProp() {
      return this.childProp === undefined ? "children" : this.childProp;
    },
    _keyProp() {
      return this.keyProp === undefined ? "key" : this.keyProp;
    },
    _titleProp() {
      return this.titleProp === undefined ? "title" : this.titleProp;
    },
    _maxLevel() {
      return this.maxLevel === undefined || isNaN(this.maxLevel)
        ? 9007199254740992
        : this.maxLevel;
    },
    _expandAll() {
      return this.expandAll === undefined ? false : this.expandAll;
    }
  },
  watch: {
    checkedKeys(value){
      this.$nextTick(function() {
        this.slowCheckedKeys = value;
      });
    },
    /**
     * 数据源设置时触发事件，用于把非树结构的集合转化为树结构集合
     * @param {*} value 数据
     */
    dataSource(value) {
      if (value.length === 0) {
        this.treeData = [];
      } else {
        var treeData = [];
        if (this._listType === "list") {
          treeData = this.listToTreeList(value);
        }
        if (this.sort !== undefined) {
          this.treeSort(treeData);
        }
        this.$nextTick(function() {
          this.treeData = treeData;
          this.slowCheckedKeys = this.checkedKeys;
          var ret = [];
          if (this._expandAll) {
            this.getMatchParent(this.treeData, "", ret);
          }
          this.expandedKeys = ret;
        });
      }
    }
  },
  methods: {
    expand(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    /**
     * 复选框勾选时间
     * @param {*} value 选中节点集合
     */
    check(value) {
      this.slowCheckedKeys = value;
      this.$emit("check", value);
    },
    /**
     * 选中树节点时触发
     * @param {*} value 选中节点集合
     */
    select(value) {
      this.$emit("select", value);
    },
    /**
     * 关键字搜索节点方法，输入关键字，重点显示关键字匹配项
     * @param {*} keyword 关键字
     */
    keywordSearch(keyword) {
      this.keyword = keyword;
      if (
        this.keyword === "" ||
        this.keyword === null ||
        this.keyword === undefined
      ) {
        return;
      }
      var ret = [];
      this.getMatchParent(this.treeData, keyword, ret);
      this.expandedKeys = ret;
    },
    /**
     * 获取匹配的父节点集合
     * @param {*} treeData 树集合
     * @param {*} keyword 关键字
     * @param {*} ret 匹配的父节点集合
     */
    getMatchParent(treeData, keyword, ret) {
      var exist = false;
      for (var i = treeData.length - 1; i >= 0; i--) {
        var tempNode = treeData[i];
        if (
          tempNode[this._titleProp].indexOf(keyword) > -1 &&
          exist === false
        ) {
          ret[ret.length] = tempNode[this._parentKeyProp];
          exist = true;
        }
        var child = tempNode[this._childProp];
        if (child.length > 0) {
          this.getMatchParent(child, keyword, ret);
        }
      }
    },
    /**
     * 对符合查询条件的数据高亮
     * @param {*} node 当前匹配节点
     */
    filterTreeNode(node) {
      if (
        this.keyword === "" ||
        this.keyword === null ||
        this.keyword === undefined
      ) {
        return false;
      }
      return node.title.indexOf(this.keyword) > -1;
    },
    /**
     * 根据节点id删除节点
     * @param {*} key 节点id
     */
    delNode(key) {
      this.delNodeRecursive(this.treeData, key);
    },
    /**
     * 根据节点id递归删除节点
     * @param {*} list 需要删除的集合
     * @param {*} key 节点id
     */
    delNodeRecursive(list, key) {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i][this._keyProp] === key) {
          list.splice(i, 1);
        } else {
          var child = list[i][this._childProp];
          if (child.length > 0) {
            this.delNodeRecursive(child, key);
          }
        }
      }
    },
    /**
     * 还原最近一次拖动操作
     */
    restoreLastDrag() {
      this.treeData = JSON.parse(this.backups);
    },
    /**
     * 节点拖动放下
     */
    drop(value) {
      this.backups = JSON.stringify(this.treeData);
      var dropPosArray = value.node.pos.split("-"); // 放置的目标的绝对位置
      var dropMenuNode; //放置的目标元素，
      var dropMenuSibling; //放置的目标位置的同级节点列表
      for (let i = 1, len = dropPosArray.length; i < len; i++) {
        let tempIndex = parseInt(dropPosArray[i]);
        if (dropMenuNode === undefined) {
          dropMenuNode = this.treeData[tempIndex];
          dropMenuSibling = this.treeData;
        } else {
          dropMenuSibling = dropMenuNode[this._childProp];
          dropMenuNode = dropMenuSibling[tempIndex];
        }
      }
      var dragPosArray = value.dragNode.pos.split("-"); //拖动节点的绝对位置
      var dragPosRelative; //拖动节点的相对位置
      var dragMenuNode; //拖动的节点
      var dragMenuSibling; //拖动的节点的同级节点列表
      for (let i = 1, len = dragPosArray.length; i < len; i++) {
        var tempIndex = parseInt(dragPosArray[i]);
        dragPosRelative = tempIndex;
        if (dragMenuNode === undefined) {
          dragMenuNode = this.treeData[tempIndex];
          dragMenuSibling = this.treeData;
        } else {
          dragMenuSibling = dragMenuNode[this._childProp];
          dragMenuNode = dragMenuSibling[tempIndex];
        }
      }
      var dropPos =
        value.dropPosition - parseInt(dropPosArray[dropPosArray.length - 1]);
      if (value.dropToGap) {
        if (
          dragMenuNode[this._parentKeyProp] ===
          dropMenuNode[this._parentKeyProp]
        ) {
          if (value.dropPosition < dragPosRelative) {
            dropMenuSibling.splice(value.dropPosition + 1, 0, dragMenuNode);
            dragMenuSibling.splice(dragPosRelative + 1, 1);
          } else {
            dropMenuSibling.splice(value.dropPosition, 0, dragMenuNode);
            dragMenuSibling.splice(dragPosRelative, 1);
          }
        } else {
          dragMenuSibling.splice(dragPosRelative, 1);
          dropMenuSibling.splice(value.dropPosition + 1, 0, dragMenuNode);
        }
      } else {
        dragMenuSibling.splice(dragPosRelative, 1);
        dropMenuNode[this._childProp].push(dragMenuNode);
        dropPos = 0;
      }
      this.$emit("drop", dragMenuNode, dropMenuNode, dropPos);
    },
    /**
     * 树集合排序
     * @param {*} treeList 需要排序的树集合
     */
    treeSort(treeList) {
      treeList.sort(this.sort);
      for (var i = 0, len = treeList.length; i < len; i++) {
        var childTreeList = treeList[i][this._childProp];
        if (childTreeList.length > 0) {
          this.treeSort(childTreeList);
        }
      }
    },
    /**
     * 普通集合转化为树集合
     * @param {*} list 需要转化的集合
     */
    listToTreeList(list) {
      var treeList = [];
      var indexMap = {};
      var tempNode;
      for (var i = list.length - 1; i >= 0; i--) {
        tempNode = list[i];
        if (this.isRoot(tempNode)) {
          treeList[treeList.length] = tempNode;
          indexMap[tempNode[this._keyProp]] = [treeList.length - 1];
          list.splice(i, 1);
        } else {
          var parentKey = tempNode[this._parentKeyProp];
          if (Object.prototype.hasOwnProperty.call(indexMap, parentKey)) {
            var indexs = indexMap[parentKey];
            if (indexs.length < this._maxLevel) {
              this.findParentAndAddChild(
                tempNode,
                parentKey,
                indexs,
                indexMap,
                treeList
              );
            }
            list.splice(i, 1);
          }
        }
      }
      var prevCount = 0,
        currentCount = list.length;
      while (prevCount != currentCount) {
        for (i = list.length - 1; i >= 0; i--) {
          tempNode = list[i];
          parentKey = tempNode[this._parentKeyProp];
          if (Object.prototype.hasOwnProperty.call(indexMap, parentKey)) {
            indexs = indexMap[parentKey];
            if (indexs.length < this._maxLevel) {
              this.findParentAndAddChild(
                tempNode,
                parentKey,
                indexs,
                indexMap,
                treeList
              );
            }
            list.splice(i, 1);
          }
        }
        prevCount = currentCount;
        currentCount = list.Count;
      }
      return treeList;
    },
    /**
     * 从下标列表中获取节点
     * @param {*} treeList 树集合
     * @param {*} indexs 下标列表
     */
    getNodeFromIndex(treeList, indexs) {
      var tempList = treeList;
      for (var i = 0, len = indexs.length - 1; i < len; i++) {
        tempList = tempList[indexs[i]][this._childProp];
      }
      return tempList[indexs[indexs.length - 1]];
    },
    /**
     * 寻找节点的父节点并把节点放入父节点的子节点列表中
     * @param {*} node 游离的节点
     * @param {*} parentKey 父节点id
     * @param {*} indexs 父节点的坐标
     * @param {*} indexMap 节点坐标
     * @param {*} treeList 树
     */
    findParentAndAddChild(node, parentKey, indexs, indexMap, treeList) {
      var parent = this.getNodeFromIndex(treeList, indexs);
      var parentChild = parent[this._childProp];
      parentChild[parentChild.length] = node;
      var newIndexs = indexs.concat(parentChild.length - 1);
      indexMap[node[this._keyProp]] = newIndexs;
    }
  }
};
</script>