<template>
  <div class="home">
    <!-- 头 -->
    <header>
      <h2
        @dblclick="dblclick"
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
          class="index"
          v-for="(i,n) in item.children"
          :key="i.name"
        >
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
              <MinusCircleOutlined style="color:#e2333c;marginLeft: 10px" />
            </a-popconfirm>
          </div>
        </div>
        <div class="down">
          <a-button
            size="small"
            @click="isAdd = true; title = '新增指标'; isCreate = true; index = idx"
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
    </main>
    <!-- 底 -->
    <footer>
      <div @click="isCreate = true; title = '新增目标'; isAdd = false">
        <PlusOutlined style="marginRight:5px" />
        <span>新增目标</span>
      </div>
    </footer>
    <!-- modal框 -->
    <a-modal
      v-model:visible="isCreate"
      :title="title"
      :maskClosable="false"
      ok-text="确认"
      cancel-text="取消"
      @cancel="isCreate = false"
      @ok="confirm"
    >
      <a-input
        v-model:value="targerVal"
        :placeholder="isAdd ? '请输入指标名称': '请输入目标名称'"
      ></a-input>
      <!-- <a-input placeholder="进度"></a-input> -->
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
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
      console.log(e.target)
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
    // 遮罩部分
    const isCreate = ref<boolean>(false)
    const isAdd = ref<boolean>(false)
    const title = ref<string>('')
    const targerVal = ref<string>('')
    const confirm = () => {
      if (!targerVal.value) {
        return message.error('请输入名称', 1)
      }
      // 添加指标
      isAdd.value &&
        target_list.value[index.value].children.push({
          name: targerVal.value,
          schedule: 0,
          disbled: false
        })
      // 添加目标
      isAdd.value ||
        target_list.value.push({ name: targerVal.value, children: [] })
      isCreate.value = false
    }
    watch(
      [isCreate],
      ([val]) => {
        if (!val) {
          title.value = ''
          targerVal.value = ''
        }
      },
      { deep: true }
    )
    return {
      target_list,
      isCreate,
      title,
      targerVal,
      confirm,
      delTar,
      isAdd,
      index,
      edit,
      delIndex,
      toggleIndex,
      isToggle,
      dblclick
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
      .index
        display flex
        justify-content space-between
        align-items center
        position relative
        height 30px
        margin 0 20px 0 50px
        border-bottom 1px solid rgba(0, 0, 0, 0.32)
        .arrow
          position absolute
          left -45px
          height 30px
          line-height 30px
          span
            cursor pointer
        &:hover
          background #f5f7fa
        i
          display inline-block
          width 8px
          height 8px
          border-radius 10px
          background #1890ff
          margin-right 10px
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
