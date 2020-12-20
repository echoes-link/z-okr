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
        <div
          class="out"
          v-for="(i,n) in item.children"
          :key="i.name"
        >
          <div class="index">
            <div
              class="arrow"
              v-if="isToggle"
            >
              <ArrowUpOutlined
                style="marginRight: 5px"
                @click="toggleIndex(item.children, n, 'on')"
                v-if="n !== 0 "
              />
              <StopOutlined
                v-else
                style="marginRight: 5px;color:#c73a3a"
              />
              <ArrowDownOutlined
                @click="toggleIndex(item.children, n, 'down')"
                v-if="n !== item.children.length - 1 "
              />
              <StopOutlined
                v-else
                style="color:#c73a3a"
              />
            </div>
            <div>
              <i></i>
              <span>{{i.name}}</span>
            </div>
            <div style="marginRight:10px">
              <PieChartOutlined style="marginRight: 5px" />
              <span v-if="!i.disbled">{{i.schedule}}%</span>
              <a-input-number
                v-else
                :min="0"
                :max="100"
                size="small"
                v-model:value="i.schedule"
                @blur="i.disbled = false"
              ></a-input-number>
              <a-popconfirm
                title="确定删除此指标？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="delIndex(item.children,n)"
              >
                <MinusCircleOutlined
                  style="color:#e2333c;marginLeft: 10px;"
                  class="del"
                />
              </a-popconfirm>
            </div>
          </div>
        </div>
        <div
          class="put"
          v-if="isAdd && index === idx"
        >
          <a-input
            id="ix"
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
            @click="isAdd = true; index = idx;focusOn('b')"
          >
            <template #icon>
              <PlusSquareOutlined />
            </template>添加指标
          </a-button>
          <a-button
            size="small"
            v-if="!isToggle"
            :disabled="item.children.length <= 1"
            @click="isToggle = true"
          >
            <template #icon>
              <SwapOutlined :rotate="90" />
            </template>更换指定顺序
          </a-button>
          <a-button
            size="small"
            v-else
            @click="isToggle = false"
          >
            <template #icon>
              <CheckCircleOutlined />
            </template>完成
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
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import {
  AimOutlined,
  PieChartOutlined,
  PlusSquareOutlined,
  SwapOutlined,
  BookOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  StopOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

interface List {
  name: string
  // children: { name: string; schedule: number; disbled: boolean }[]
  children: { [key: string]: string | number | boolean }[]
}

export default defineComponent({
  name: 'Home',
  components: {
    AimOutlined,
    PieChartOutlined,
    PlusSquareOutlined,
    SwapOutlined,
    BookOutlined,
    DeleteOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleOutlined,
    StopOutlined
  },
  setup() {
    const target_list = ref<List[]>([
      {
        name: '目标1',
        children: [{ name: '指标1', schedule: 0, disbled: false }]
      }
    ])
    const dblclick = (e: any) => {
      e.target.setAttribute('contenteditable', 'true')
    }
    const targerVal = ref<string>('')
    const isAdd = ref<boolean>(false)
    const title = ref<string>('')
    const isCreate = ref<boolean>(false)
    const focusOn = (z: string) => {
      if (z === 'a') {
        isCreate.value = true
        nextTick(() => {
          const dom: any = document.getElementById('ip')
          dom.focus()
        })
      }
      if (z === 'b') {
        isAdd.value = true
        nextTick(() => {
          const dom: any = document.getElementById('ix')
          dom.focus()
        })
      }
    }

    // 指标部分
    const isToggle = ref<boolean>(false)
    const delTar = (i: number) => {
      target_list.value.splice(i, 1)
      message.success('删除成功', 1)
    }
    const delIndex = (v: [], i: number) => {
      v.splice(i, 1)
      message.success('删除成功', 1)
    }
    const addIndex = (item: List = { name: '', children: [] }) => {
      if (isAdd.value) {
        targerVal.value &&
          item.children.push({
            name: targerVal.value,
            schedule: 0,
            disbled: false
          })
        targerVal.value ||
          item.children.push({
            name: '新指标',
            schedule: 0,
            disbled: false
          })
        isAdd.value = false
      }
      if (isCreate.value) {
        title.value &&
          target_list.value.push({
            name: title.value,
            children: []
          })
        title.value ||
          target_list.value.push({
            name: '新目标',
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
    const index = ref<number>(0)

    return {
      target_list,
      isCreate,
      title,
      targerVal,
      delTar,
      isAdd,
      index,
      edit,
      delIndex,
      toggleIndex,
      isToggle,
      dblclick,
      addIndex,
      focusOn
    }
  }
})
</script>

<style lang="stylus" scoped>
.home
  box-sizing border-box
  width 100%
  height 100%
  padding 60px 60px 0
  header
    h2
      outline none
      &:focus
        box-shadow 0 0 0 2px rgba(24, 144, 255, 0.2)
        border-color #40a9ff
  main
    .target
      border 1px solid rgba(0, 0, 0, 0.32)
      margin-bottom 20px
      .title
        height 40px
        line-height 40px
        font-size 20px
        border-bottom 1px solid rgba(0, 0, 0, 0.32)
        .icon
          color #1890ff
          margin-left 20px
          margin-right 10px
      .put
        margin 10px 20px 0 50px
      .out
        .index
          display flex
          justify-content space-between
          align-items center
          position relative
          cursor pointer
          height 30px
          margin 0 20px 0 50px
          border-bottom 1px solid rgba(0, 0, 0, 0.32)
          .arrow
            position absolute
            left -45px
            height 30px
            line-height 30px
          i
            display inline-block
            width 8px
            height 8px
            border-radius 10px
            background #1890ff
            margin-right 10px
          .del
            visibility hidden
          &:hover
            background #f5f5fb
            .del
              visibility visible
      .down
        height 40px
        line-height 40px
        margin-left 50px
        .ant-btn
          margin-right 10px
  footer
    height 40px
    line-height 40px
    padding-left 20px
    border 1px dashed rgba(0, 0, 0, 0.32)
    div
      cursor pointer
</style>
