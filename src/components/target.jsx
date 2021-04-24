import {
  Add,
  Bill,
  ChartPie,
  Delete,
  SortThree,
  Target,
  ArrowUp,
  ArrowDown,
  ToTop,
  ToBottom
} from '@icon-park/react'
import { Button, Input, InputNumber, Modal, Popover } from 'antd'
import React from 'react'
import './index.scss'
const { TextArea } = Input
import dels from '../../static/del.png'

const tip = <p>双月结束时填写指标得分,分数再0.0~1之间</p>
const indexTip = <div>点击填写指标权重</div>

// 删除弹窗，自定义hook
const Dialog = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => setIsModalVisible(true)
  const handleOk = () => {
    setIsModalVisible(false)
    props.type === '指标' && props.delIndex(props.index)
    props.type === '目标' && props.delTar(props.index)
  }
  const handleCancel = () => setIsModalVisible(false)
  let button
  if (props.type === '目标') {
    button = (
      <Button onClick={showModal}>
        <Delete theme="outline" size="16" fill="#aeafb2" strokeLinecap="square"></Delete>
        删除目标
      </Button>
    )
  } else if (props.type === '指标') {
    button = <Delete theme="outline" size="16" fill="currentColor" onClick={showModal} />
  }
  return (
    <>
      {button}
      <Modal
        visible={isModalVisible}
        bodyStyle={{ padding: '64px 32px 24px', display: 'flex', alignItems: 'flex-start' }}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered={true}
        okText={props.type === '目标' ? '是' : '确认'}
        cancelText={props.type === '目标' ? '否' : '取消'}
      >
        <img src={dels} width="100" height="100" style={{ marginRight: '24px' }} />
        <div>
          <div style={{ fontSize: '20px', fontWeight: 500 }}>删除{props.type}</div>
          <div style={{ marginTop: '8px', lineHeight: '1.5', fontSize: '16px', color: '#99' }}>
            删除目标后不可恢复，是否继续？
          </div>
        </div>
      </Modal>
    </>
  )
}

/**
 * @description 调整指标弹窗
 */
const Weight = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)

  let button = (
    <div className="key_res_weight" onClick={showModal}>
      <ChartPie theme="outline" size="16" fill="currentColor" strokeLinecap="square" />
      <Popover placement="top" content={indexTip}>
        <span style={{ marginLeft: '8px' }}>{'100%'}</span>
      </Popover>
    </div>
  )
  return (
    <>
      {button}
      <Modal
        className="weight_modal"
        visible={isModalVisible}
        okText="确认"
        cancelText="取消"
        centered={true}
        title="指标权重"
        onCancel={handleCancel}
        footer={[
          <span>权重总计：100%</span>,
          <span>
            <Button>取消</Button>
            <Button type="primary">确认</Button>
          </span>
        ]}
      ></Modal>
    </>
  )
}

class Targrts extends React.Component {
  constructor(props) {
    super(props)
    this.obj_input = null // 目标ref
    this.state = {
      target_name: '', // 目标名称
      isFocus: false,
      progress: '',
      edit_order: false, // 编辑顺序
      queto: [] // 指标
    }
  }

  // 操控按钮
  Actions = () => {
    if (this.state.isFocus) {
      return (
        <>
          <div className="ObjectActions">
            <Button
              style={{ background: '#494bbf', color: '#fff', padding: '0 26px' }}
              onClick={() => this.setState({ isFocus: false })}
            >
              保存
            </Button>
            <Button style={{ padding: '0 26px' }} onClick={() => this.setState({ isFocus: false })}>
              取消
            </Button>
          </div>
        </>
      )
    } else {
      return (
        <div className="ObjectActions">
          <Button onClick={this.addIndex}>
            <Add theme="outline" size="16" fill="#aeafb2" />
            添加指标
          </Button>
          <Button onClick={this.changeOrder}>
            <SortThree theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            {this.state.edit_order ? '保存指标顺序' : '更换指标顺序'}
          </Button>
          <Button onClick={() => this.setState({ isFocus: true })}>
            <Bill theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            填写进展
          </Button>
          <Dialog type="目标" delTar={this.props.del} index={this.props.index}></Dialog>
        </div>
      )
    }
  }

  /**
   * @description 更换顺序
   */
  changeOrder = () => {
    let isOrder = this.state.edit_order
    isOrder = !isOrder
    this.setState({ edit_order: isOrder })
  }

  /**
   * @description 删除指标
   * @param {number} i 下标
   */
  delQueto = i => {
    const lists = this.state.queto
    lists.splice(i, 1)
    this.setState({ queto: lists })
  }

  // 新增指标
  addIndex = () => {
    const indexs = this.state.queto
    indexs.push({
      name: '',
      score: 0.0,
      weight: '100.00%',
      id: Math.random().toString(36).substr(2)
    })
    this.setState({ queto: indexs })
  }

  // 进度
  Progress = () => {
    const { progress } = this.state
    if (this.state.isFocus) {
      return (
        <TextArea
          tabIndex={1}
          value={progress}
          onChange={e => this.setState({ progress: e.target.value })}
          bordered={false}
          autoFocus
          autoSize
          style={{ minHeight: '144px', padding: 0 }}
          onBlur={() => this.setState({ isFocus: false })}
        ></TextArea>
      )
    } else {
      return (
        <pre>
          <span onClick={() => this.setState({ isFocus: true })}>{progress}</span>
        </pre>
      )
    }
  }

  /**
   * @description onChange事件的回调
   * @param {number} index 下标
   * @param {string} name 属性
   * @param {event} e event对象
   */
  handleName = (index, name, e) => {
    console.log(e)
    const list = this.state.queto
    if (name === 'name') list[index][name] = e.target.value
    else if (name === 'score') list[index][name] = e
    this.setState({ queto: list })
  }

  // 指标列表
  KeyResult = () => {
    const indexs = this.state.queto
    let action
    const lists = indexs.map((element, index) => (
      <div className="KeyResult" key={element.id}>
        <div className="key_res_info">
          <Input
            bordered={false}
            value={element.name}
            onChange={this.handleName.bind(this, index, 'name')}
            onFocus={e => e.target.parentElement.parentElement.classList.add('focus-input')}
            onBlur={e => e.target.parentElement.parentElement.classList.remove('focus-input')}
          ></Input>
          {this.state.edit_order ? (
            <div className="key_res_order">
              <div className={index === 0 ? 'key_res_order_not' : 'key_res_order_allow'}>
                <ToTop theme="outline" size="16" fill="currentColor" />
              </div>
              <div className={index === 0 ? 'key_res_order_not' : 'key_res_order_allow'}>
                <ArrowUp theme="outline" size="16" fill="currentColor" />
              </div>
              <div
                className={
                  index === indexs.length - 1 ? 'key_res_order_not' : 'key_res_order_allow'
                }
              >
                <ArrowDown theme="outline" size="16" fill="currentColor" />
              </div>
              <div
                className={
                  index === indexs.length - 1 ? 'key_res_order_not' : 'key_res_order_allow'
                }
              >
                <ToBottom theme="outline" size="16" fill="currentColor" />
              </div>
            </div>
          ) : (
            <div className="key_res_act">
              {/* 删除 */}
              <div className="key_res_del">
                {/* <Delete theme="outline" size="16" fill="currentColor" /> */}
                <Dialog type="指标" index={index} delIndex={this.delQueto}></Dialog>
              </div>
              {/* 权重 */}
              {/* <div className="key_res_weight">
                <ChartPie theme="outline" size="16" fill="currentColor" strokeLinecap="square" />
                <Popover placement="top" content={indexTip}>
                  <span style={{ marginLeft: '8px' }}>{'100%'}</span>
                </Popover>
              </div> */}
              <Weight></Weight>
              {/* 评分 */}
              <div className="key_res_score">
                <div className="score_input">
                  <Popover placement="topRight" content={tip}>
                    <InputNumber
                      min={0.0}
                      max={1}
                      stringMode
                      bordered={false}
                      value={element.score}
                      onChange={this.handleName.bind(this, index, 'score')}
                    ></InputNumber>
                  </Popover>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ))
    return <>{lists}</>
  }

  render() {
    let { target_name } = this.state
    return (
      <div className="ObjectiveCard">
        {/* 目标名称 */}
        <div className="obj_input " ref={el => (this.obj_input = el)}>
          <div className="obj_input_cont">
            <div>
              <Target theme="outline" size="16" fill="#494bbf" strokeLinecap="square" />
              <Input
                bordered={false}
                onFocus={() => this.obj_input.classList.add('focus-input')}
                onBlur={() => this.obj_input.classList.remove('focus-input')}
                value={target_name}
                onChange={e => this.setState({ target_name: e.target.value })}
              ></Input>
            </div>
          </div>
          <div className="score">0.00</div>
        </div>
        {/* 指标内容 */}
        <this.KeyResult></this.KeyResult>
        {/* 进展 */}
        <div className="ObjectProgress">
          <div className="progress_header">
            <Bill theme="outline" size="16" fill="#494bbf" strokeLinecap="square" />
            进展
          </div>
          <this.Progress></this.Progress>
        </div>
        {/* 操作部分 */}
        <this.Actions></this.Actions>
      </div>
    )
  }
}

export default Targrts
