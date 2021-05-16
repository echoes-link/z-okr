import React from 'react'
import { ChartPie } from '@icon-park/react'
import { Popover, Input, Modal, Button } from 'antd'

const indexTip = <div>点击填写指标权重</div>

/**
 * @description 调整指标弹窗
 */
const Weight = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)
  const handleOk = () => {}

  let button = (
    <div className="key_res_weight" onClick={showModal}>
      <ChartPie theme="outline" size="16" fill="currentColor" strokeLinecap="square" />
      <Popover placement="top" content={indexTip}>
        <span style={{ marginLeft: '8px' }}>{'100%'}</span>
      </Popover>
    </div>
  )

  const handleWight = (index, e) => {
    console.log(index, e)
    props.changeWeight(index, Number(e.target.value))
  }
  // const map_list = props.list.map(e => {
  //   return { weight: e.weight, name: e.name }
  // })
  // console.log(map_list)
  // 指标列表
  let weight_list = props.list.map((e, i) => (
    <div style={{ marginBottom: '24px' }} key={e.id}>
      <div className="weight_header">
        <div className="weight_header_title">{`指标${i + 1}`}</div>
        <div className="weight_header_power" tabIndex={1}>
          <ChartPie theme="outline" size="16" fill="#999" strokeLinecap="square" />
          <div className="weight_header_power_input">
            <Input
              type="text"
              value={e.weight}
              bordered={false}
              placeholder={e.weight}
              onChange={e => {
                handleWight(i, e)
              }}
            ></Input>
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
