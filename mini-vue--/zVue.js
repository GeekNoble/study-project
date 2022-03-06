
class zVue{
  constructor(options) {
    this.$options = options
    
    this.$data = options.data
    this.$el = options.el
    this.observer(this.$data)  // 添加observer监听
    new zComplie(options.el, this)   // 添加文档解析
    if (options.created) {
      options.created.call(this)
    }
  }

  observer(data) {    //监听data数据，双向绑定
    if (!data || typeof(data) !== 'object') {
      return ''
    }
    // console.log(data, 'observer data')
    Object.keys(data).forEach(key => {
      this.observerData(key, data, data[key])   // 监听data对象
      this.proxyData(key)
    })
  }

  observerData(key, obj, value) {
    this.observer(key) 
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        console.log('触发了', key)
        return value
      },
      set(newValue) {
        if (newValue === value) 
          return
        value = newValue
        // console.log('变了', dep)
        // 通知变化
        dep.notifyDep()
      }
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newValue) {
        this.$data[key] = newValue
      }
    })

  }
  
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDep(dep) {
    this.deps.push(dep)
    console.log(this.deps, '看看')
  }

  notifyDep() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

class Watch {
  constructor( vm, key, ininVal, cb) {
    this.vm = vm   // 保存vue对象实例
    this.key = key  // 保存绑定的key
    this.cb = cb    // 同步两者的回调函数
    this.ininVal = ininVal  // 初始化值
    Dep.target = this

    this.vm[this.key]       // 触发对象的get方法
    Dep.target = null
  }

  update() {
    this.cb.call(this.vm, this.vm[this.key], this.ininVal)
  }
}
class zComplie {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      this.$fragment = this.getNodeChirden(this.$el)
      this.complie(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }

  getNodeChirden(el) {
    const frag = document.createDocumentFragment()
    let child
    while (el.firstChild) {
      // child = el.firstChild
      // console.log('getNodeChirden方法 el1', el, el.childNodes)
      frag.appendChild(el.firstChild)  // 将el.firstChild 移动到frag
      // console.log('getNodeChirden方法 el2', el, el.firstChild)

    }
    return frag
  }

  complie(el) {
    const childNodes = el.childNodes
    // console.log('complie方法 childNodes', childNodes)
    Array.from(childNodes).forEach(node => {
      if(node.nodeType == 1) {
        const nodeAttrs = node.attributes
        // 遍历属性，拿到动态属性
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name
          const attrVal = attr.value
          if (attrName.slice(0,2) === 'z-') {
            var tagName = attrName.substring(2)
            switch(tagName) {
              case 'model':
                this.zDir_model(node, attrVal)
                break
              case 'html':
                this.zDir_html(node, attrVal)
                break
            }
          }

          if(attrName.slice(0,1) === '@') {
            var tagName = attrName.substring(1)
            this.zDir_click(node, attrVal)
          }
        })
      } else if (node.nodeType == 2) {

        console.log("NodeType === 2")
      } else if (node.nodeType == 3) {
        this.complieText(node)
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.complie(node)
      }
    })
  }

  zDir_click(node, attrVal) {
    let fn = this.$vm.$options.methods[attrVal]
    node.addEventListener('click', fn.bind(this.$vm))
  }
  zDir_model(node, value) {
    const vm = this.$vm
    this.updateAll('model', node, node.value)
    node.addEventListener('input', e => {
      vm[value] = e.target.value
    })
  }
  zDir_html(node, value) {
    this.updateHtml(node, this.$vm[value])
  }
  updateHtml(node, value) {
    node.innerHtml = value
  }

  complieText(node) {
    // console.log('complieText方法 node', node )

    if (typeof(node.textContent) !== 'string') {
      return ''
    }
    
    const key = node.textContent.match(/(?<={{).+(?=}})/)  //获取监听的key 匹配{{key}} 中的key
    // console.log('complieText方法 key', key )
		this.updateAll( 'text', node, key );
  }

  updateAll(type, node, key) {
    // console.log(Dep.target)

    switch(type) {
      case 'text': 
        if (key) {
          // const updater = this.updateText
          const initVal = node.textContent   //记录原文本第一次的数据
          // console.log('updateAll方法 this.$vm, key[0], this.$vm[key[0]]', this.$vm, key[0], this.$vm[key[0]])
          this.updateText(node, this.$vm[key], initVal)
          // debugger

          new Watch(this.$vm, key, initVal,  (value, initVal) => {
            this.updateText(node, value, initVal)
          })
        }
        break
      case 'model':
        // const updater = this.updateModel
        new Watch(this.$vm, key, null, (value, initVal) => {
          this.updateModel(node, value)
        })
        break
    }
  }
  
  updateModel(node, value) {
    node.value = value
  }

  updateText(node, value, initVal) {
    var reg = /{{(.*)}}/ig;
		var replaceStr = String( initVal.match(reg) );
    // console.log(replaceStr, value, initVal, '看看')

		var result = initVal.replace(replaceStr, value );
    // console.log('updateText方法 result', result)
		node.textContent = result;
  }
}
