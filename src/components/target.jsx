import React from 'react'
import './index.scss'
import { Target, ChartPie, Delete, Add, SortThree, Bill } from '@icon-park/react'
import { Input, InputNumber, Popover, Button } from 'antd'

const tip = <p>双月结束时填写指标得分,分数再0.0~1之间</p>
const indexTip = <div>点击填写指标权重</div>

class Targrts extends React.Component {
  constructor() {
    super()
    this.obj_input = null // 目标ref
    this.state = {
      target_name: '', // 目标名称
      queto: [] // 指标
    }
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
        <div className="KeyResult">
          <div className="key_res_info">
            <Input bordered={false} onFocus></Input>
            <div className="key_res_act">
              {/* 删除 */}
              <div className="key_res_del">
                <Delete theme="outline" size="16" fill="currentColor" />
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
        {/* 操作部分 */}
        <div className="ObjectActions">
          <Button>
            <Add theme="outline" size="16" fill="#aeafb2" />
            添加指标
          </Button>
          <Button>
            <SortThree theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            更改指标顺序
          </Button>
          <Button>
            <Bill theme="outline" size="16" fill="#aeafb2" strokeLinecap="square" />
            填写进展
          </Button>
          <Button>
            <Delete theme="outline" size="16" fill="#aeafb2" strokeLinecap="square"></Delete>
            删除目标
          </Button>
        </div>
      </div>
    )
  }
}

export default Targrts
