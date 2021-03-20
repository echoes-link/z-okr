<template>
  <div class="home">
    <!-- 头 -->
    <header>
      <h2
        @click="dblclick"
        contenteditable="false"
      >小明的OKR</h2>
    </header>
    <!-- 内容 -->
    <main>
      <div
        class="target"
        v-for="(item,idx) in target_list"
        :key="item.name"
      >
        <div class="title">
          <AimOutlined class="icon" />
          <span style="fontWeight: 700">{{item.name}}</span>
        </div>
        <draggable
          :list="item.children"
          item-key="id"
          tag="transition-group"
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null
          }"
          handle=".handle"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element, index }">
            <div class="row">
              <div
                class="put"
                v-if="position === 'up' && del_index.in === index"
              >
                <a-input
                  id="up"
                  @keyup.esc="position = '';targerVal = ''"
                  v-model:value="targerVal"
                  placeholder="请输入指标内容，按回车确认,esc取消"
                  @pressEnter="addIndex(item)"
                  @blur="addIndex(item)"
                ></a-input>
              </div>
              <div class="out">
                <div class="task-icon">
                  <a-tooltip placement="top">
                    <template #title>
                      <span>点击展示更多菜单</span>
                    </template>
                    <a-popover
                      trigger="click"
                      placement="bottomLeft"
                    >
                      <template #content>
                        <div
                          class="tippy"
                          @click="rename(idx,index,element.name)"
                        >
                          <div class="tippy-item">
                            <div>
                              <edit
                                theme="outline"
                                size="14"
                                fill="#aeafb2"
                              />
                            </div>
                            <div style="color:#333">重命名</div>
                          </div>
                        </div>
                        <div
                          class="tippy"
                          @click="createTask('up',item.children,index,idx)"
                        >
                          <div class="tippy-item">
                            <div>
                              <arrow-up
                                theme="outline"
                                size="14"
                                fill="#aeafb2"
                              />
                            </div>
                            <div>在上方创建任务</div>
                          </div>
                        </div>
                        <div
                          class="tippy"
                          @click="createTask('down',item.children,index,idx)"
                        >
                          <div class="tippy-item">
                            <div>
                              <arrow-down
                                theme="outline"
                                size="14"
                                fill="#aeafb2"
                              />
                            </div>
                            <div>在下方创建任务</div>
                          </div>
                        </div>
                        <div class="split"></div>
                        <div
                          class="tippy"
                          @click="isDel = true;del_index = {val:item.children,in:index}"
                        >
                          <div class="tippy-item">
                            <div>
                              <delete
                                theme="outline"
                                size="14"
                                fill="#aeafb2"
                              />
                            </div>
                            <div>删除</div>
                          </div>
                        </div>
                      </template>
                      <span class="handle">
                        <more-one
                          style="display: flex"
                          theme="outline"
                          size="18"
                          fill="#333"
                          @click="Index=idx;index1=index"
                        />

                      </span>
                    </a-popover>
                  </a-tooltip>
                </div>

                <div class="index">
                  <div class="index-title">
                    <i></i>
                    <span style="marginRight: 10px">{{element.name}}</span>
                    <span @click="rename(idx,index,element.name)">
                      <write
                        theme="outline"
                        size="14"
                        fill="#aeafb2"
                      />
                    </span>
                  </div>
                  <div
                    class="index-title-input"
                    :id="'a'+idx+index"
                  >
                    <a-input
                      v-model:value="element.name"
                      @keyup.esc="cancelEdit($event,element,false)"
                      @blur="cancelEdit($event,element,true)"
                      @pressEnter="cancelEdit($event,element,true)"
                    ></a-input>
                  </div>

                </div>
              </div>
              <div
                class="put"
                v-if="position === 'down' && del_index.in === index"
              >
                <a-input
                  id="down"
                  @keyup.esc="position = '';targerVal = ''"
                  v-model:value="targerVal"
                  placeholder="请输入指标内容，按回车确认,esc取消"
                  @pressEnter="addIndex(item)"
                  @blur="addIndex(item)"
                ></a-input>
              </div>
            </div>
          </template>
        </draggable>

        <div
          class="put"
          v-show="isAdd && Index === idx"
        >
          <a-input
            id="ix"
            autofocus="autofocus"
            @keyup.esc="isAdd = false"
            v-model:value="targerVal"
            placeholder="请输入指标内容，按回车确认,esc取消"
            @pressEnter="addIndex(item)"
            @blur="addIndex(item)"
          ></a-input>
        </div>
        <div class="down">
          <a-button
            size="small"
            @click="focusOn('b',idx)"
          >
            <template #icon>
              <PlusSquareOutlined />
            </template>添加指标
          </a-button>
          <a-button
            size="small"
            @click="edit(idx)"
          >
            <template #icon>
              <BookOutlined />
            </template>填写进展
          </a-button>
          <a-popconfirm
            title="确定删除此目标？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delTar(idx)"
          >
            <a-button size="small">
              <template #icon>
                <DeleteOutlined />
              </template>删除目标
            </a-button>
          </a-popconfirm>
        </div>
      </div>
      <div
        style="marginBottom: 20px;width: 40%"
        v-if="isCreate"
      >
        <a-input
          placeholder="请输入目标内容，按回车确认,esc取消"
          id="ip"
          @keyup.esc="isCreate = false"
          v-model:value="title"
          @blur="addIndex"
          @pressEnter="addIndex"
        ></a-input>
      </div>
    </main>
    <!-- 底 -->
    <footer>
      <div @click="focusOn('a')">
        <PlusOutlined style="marginRight:5px" />
        <span>新增目标</span>
      </div>
    </footer>
    <!-- 弹框 -->
    <a-modal
      :visible="isDel"
      :centered="true"
      :closable="false"
      okText="确认"
      cancelText="取消"
      @cancel="isDel = false"
      @ok="delIndex(del_index.val,del_index.in)"
    >
      <img
        src="../assets/del.png"
        width="100"
        height="100"
        style="marginRight:24px"
      >
      <div>
        <div style="fontSize:20px;fontWeight:500">确认删除任务?</div>
        <div style="marginTop:8px;lineHeight:1.5;fontSize:16px;color:#999">删除的任务会被移动到回收站中，你可以在回收站中恢复此操作</div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import {
  AimOutlined,
  PlusSquareOutlined,
  BookOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import {
  MoreOne,
  Delete,
  Edit,
  ArrowUp,
  ArrowDown,
  Write
} from '@icon-park/vue-next'

interface List {
  name: string
  id: string
  children: { [key: string]: string | number | boolean }[]
}

export default defineComponent({
  name: 'Home',
  display: 'Handle',
  instruction: 'Drag using the handle icon',
  order: 5,
  components: {
    AimOutlined,
    // PieChartOutlined,
    PlusSquareOutlined,
    BookOutlined,
    DeleteOutlined,
    PlusOutlined,
    MoreOne,
    Delete,
    ArrowUp,
    ArrowDown,
    Edit,
    Write,
    draggable
  },
  setup() {
    const target_list = ref<List[]>([
      // {
      //   name: '目标1',
      //   id: Math.random().toString(36).substr(2),
      //   children: [
      //     {
      //       name: '指标1',
      //       schedule: 0,
      //       disbled: false,
      //       id: Math.random().toString(36).substr(2)
      //     }
      //   ]
      // }
    ])

    const del_index = reactive({ val: [], in: 0 })
    const editName = ref<string>('')
    const targerVal = ref<string>('')
    const isAdd = ref<boolean>(false)
    const title = ref<string>('')
    const isCreate = ref<boolean>(false)
    const Index = ref(999)
    const index1 = ref(999)
    const isDel = ref(false)
    const position = ref('')
    const drag = ref(false)
    // 编辑框聚焦
    const focusOn = (z: string, n: number) => {
      if (z === 'a') {
        isCreate.value = true
        nextTick(() => {
          const dom: any = document.getElementById('ip')
          dom.focus()
        })
      }
      if (z === 'b') {
        targerVal.value = ''
        Index.value = n
        isAdd.value = true
        nextTick(() => {
          const dom: any = document.getElementById('ix')
          dom.focus()
        })
      }
    }
    // 拖拽配置项
    const dragOptions = {
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost'
    }
    // 在上下方创建任务
    const createTask = (pos: string, val: [], i: number, i1: number) => {
      console.log(pos, val, i, i1)
      position.value = pos
      del_index.val = val
      del_index.in = i
      nextTick(() => {
        let dom
        pos === 'up' && (dom = document.getElementById('up') as HTMLElement)
        pos === 'down' && (dom = document.getElementById('down') as HTMLElement)
        dom && dom.focus()
      })
    }
    // 菜单栏消失
    const visibleTask = () => {
      const dom = document.querySelectorAll(
        '.ant-popover-placement-bottomLeft'
      ) as NodeListOf<HTMLElement>
      dom.forEach((v) => {
        v.style.display = 'none'
      })
    }
    // 重命名
    const rename = (i1: number, i2: number, name: string) => {
      console.log(i1, i2, name)
      editName.value = name
      Index.value = i1
      index1.value = i2
      visibleTask()
      const dom = document.querySelectorAll(
        '.target .index-title-input'
      ) as NodeListOf<HTMLElement>
      dom.forEach((v: any) => {
        if (v.id === 'a' + i1 + i2) {
          v.style.display = 'flex'
          v.firstElementChild.focus()
          v.previousElementSibling.setAttribute('style', 'display:none')
        }
      })
    }
    // 取消编辑
    const cancelEdit = (e: any, name: { [key: string]: string }, b = true) => {
      !b && (name.name = editName.value)
      console.log(name.name)
      e.target.parentNode.setAttribute('style', 'display:none')
      e.target.parentNode.previousElementSibling.setAttribute(
        'style',
        'display:flex'
      )
    }
    // 指标部分
    const isToggle = ref<boolean>(false)
    const delTar = (i: number) => {
      target_list.value.splice(i, 1)
      message.success('删除成功', 1)
    }
    // 删除指标
    const delIndex = (v: [], i: number) => {
      v.splice(i, 1)
      isDel.value = false
      message.success('删除成功', 1)
    }
    // 添加新目标或指标
    const addIndex = (
      item: List = {
        name: '',
        children: [],
        id: ''
      }
    ) => {
      if (position.value === 'up') {
        item.children.splice(del_index.in, 0, {
          name: targerVal.value !== '' ? targerVal.value : '新指标',
          schedule: 0,
          disbled: false,
          id: Math.random().toString(36).substr(2)
        })
        position.value = ''
        targerVal.value = ''
      }
      if (position.value === 'down') {
        item.children.splice(del_index.in + 1, 0, {
          name: targerVal.value !== '' ? targerVal.value : '新指标',
          schedule: 0,
          disbled: false,
          id: Math.random().toString(36).substr(2)
        })
        position.value = ''
        targerVal.value = ''
      }
      if (isAdd.value) {
        console.log('aaaaaaaa', item.children)
        targerVal.value &&
          item.children.push({
            name: targerVal.value,
            schedule: 0,
            disbled: false,
            id: Math.random().toString(36).substr(2)
          })
        targerVal.value ||
          item.children.push({
            name: '新指标',
            schedule: 0,
            disbled: false,
            id: Math.random().toString(36).substr(2)
          })
        isAdd.value = false
        targerVal.value = ''
      }
      if (isCreate.value) {
        title.value &&
          target_list.value.push({
            name: title.value,
            id: Math.random().toString(36).substr(2),
            children: []
          })
        title.value ||
          target_list.value.push({
            name: '新目标',
            id: Math.random().toString(36).substr(2),
            children: []
          })
        isCreate.value = false
      }
    }
    const toggleIndex = (val: [], i: number, order: string) => {
      order === 'on' && ([val[i], val[i - 1]] = [val[i - 1], val[i]])
      order === 'down' && ([val[i], val[i + 1]] = [val[i + 1], val[i]])
    }
    const edit = (i: number) => {
      target_list.value[i].children.forEach((element, i, arr) => {
        arr[i].disbled = true
      })
    }
    watch(isDel, (v) => {
      v && visibleTask()
    })

    return {
      target_list,
      isCreate,
      title,
      targerVal,
      delTar,
      isAdd,
      Index,
      index1,
      edit,
      delIndex,
      toggleIndex,
      isToggle,
      addIndex,
      focusOn,
      rename,
      cancelEdit,
      editName,
      isDel,
      del_index,
      position,
      createTask,
      dragOptions,
      drag
    }
  }
})
</script>

<style src="./ant.styl" lang="stylus" ></style>
<style src="./Home.styl" lang="stylus" scoped ></style>
