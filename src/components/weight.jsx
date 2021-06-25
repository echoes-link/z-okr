import React, { useState } from 'react'
import { ChartPie } from '@icon-park/react'
import { Popover, Input, Modal, Button } from 'antd'

const INDEX_TIP = <div>点击填写指标权重</div>

/**
 * @description 调整指标弹窗
 */
const Weight = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)
  const handleOk = () => {}

  const [weightList, setWeightList] = React.useState(props.list ?? [])
  let button = (
    <div className="key_res_weight" onClick={showModal}>
      <ChartPie theme="outline" size="16" fill="currentColor" strokeLinecap="square" />
      <Popover placement="top" content={INDEX_TIP}>
        <span style={{ marginLeft: '8px' }}>{'100%'}</span>
      </Popover>
    </div>
  )

  const handleWight = (index, e) => {
    // const reg = /^\d+(?:\.\d{0,2})?/
    const reg = /[^1-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g
    const { value } = e.target
    const arr = weightList
    arr[index].weight = value
    setWeightList(arr)
    // value = value.replace(/[^1-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g, '$1')
    // if (Number(value) && reg.test(value)) {
    //   console.log(1)
    //   //   console.log(value)
    //   // props.changeWeight(index, Number(value))
    // }
  }

  // 指标列表
  let weight_list = weightList.map((e, i) => (
    <div style={{ marginBottom: '24px' }} key={e.id}>
      <div className="weight_header">
        <div className="weight_header_title">{`指标${i + 1}`}</div>
        <div className="weight_header_power" tabIndex={1}>
          <ChartPie theme="outline" size="16" fill="#999" strokeLinecap="square" />
          <div className="weight_header_power_input">
            <Input
              value={e.weight}
              type="text"
              bordered={false}
              placeholder={e.weight}
              onChange={e => {
                handleWight(i, e)
              }}
            ></Input>
            {/* <input
              type="text"
              onInput={e => {
                e.target.value = e.target.value.replace(/[^1-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g, '$1')
              }}
            /> */}
          </div>
          <span className="input_power">{e.weight}</span>%
        </div>
      </div>
      <div className="weight_content">{e.name ? e.name : '未填写'}</div>
    </div>
  ))

  return (
    <>
      {button}
      <Modal
        className="weight_modal"
        visible={isModalVisible}
        centered={true}
        title="指标权重"
        width={640}
        bodyStyle={{ margin: '21px 0 24 0', padding: '0 32px' }}
        onCancel={handleCancel}
        footer={
          <>
            <span>权重总计：100%</span>
            <span>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary">确认</Button>
            </span>
          </>
        }
      >
        {weight_list}
      </Modal>
    </>
  )
}

export default Weight
