import React from 'react'
import './index.scss'
import { Target, ChartPie, Delete, Add, SortThree, Bill } from '@icon-park/react'
import { Input, InputNumber, Popover, Button, Modal } from 'antd'
const { TextArea } = Input

const tip = <p>双月结束时填写指标得分,分数再0.0~1之间</p>
const indexTip = <div>点击填写指标权重</div>

// 删除弹窗，自定义hook
const Dialog = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => setIsModalVisible(true)
  const handleOk = () => setIsModalVisible(false)
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
        <img src="/static/del.png" width="100" height="100" style={{ marginRight: '24px' }} />
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

class Targrts extends React.Component {
  constructor() {
    super()
    this.obj_input = null // 目标ref
    this.state = {
      target_name: '', // 目标名称
      isFocus: false,
      progress: '',
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
          <Button>
            <Add theme="outline" size="16" fill="#aeafb2" onClick={} />
            添加指标
          </Button>
          <Button>
            <SortThree theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            更改指标顺序
          </Button>
          <Button onClick={() => this.setState({ isFocus: true })}>
            <Bill theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            填写进展
          </Button>
          <Dialog type="目标"></Dialog>
        </div>
      )
    }
  }

  // 新增指标
  addIndex = () => {
    const indexs = this.state.queto.push({ name: '', score: 0.0, weight: '100.00%' })
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

  render() {
    let { target_name, progress } = this.state
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
        <div className="KeyResult">
          <div className="key_res_info">
            <Input bordered={false}></Input>
            <div className="key_res_act">
              {/* 删除 */}
              <div className="key_res_del">
                {/* <Delete theme="outline" size="16" fill="currentColor" /> */}
                <Dialog type="指标"></Dialog>
              </div>
              {/* 权重 */}
              <div className="key_res_weight">
                <ChartPie theme="outline" size="16" fill="currentColor" strokeLinecap="square" />
                <Popover placement="top" content={indexTip}>
                  <span style={{ marginLeft: '8px' }}>{'100%'}</span>
                </Popover>
              </div>
              {/* 评分 */}
              <div className="key_res_score">
                <div className="score_input">
                  <Popover placement="topRight" content={tip}>
                    <InputNumber min={0.0} max={1} stringMode bordered={false}></InputNumber>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
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
