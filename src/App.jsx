import React, { Component } from 'react'
import './style/index.scss'
import { Plus } from '@icon-park/react'
import Target from './components/target.jsx'
import tar_png from '../static/target.png'

class App extends Component {
  constructor() {
    super()
    this.state = {
      targets: []
    }
  }
  // 目标
  Objects = () => {
    const index = this.state.targets
    const lists = index.map((element, idx) => (
      <Target key={element.id} index={idx} del={this.delTarget}></Target>
    ))
    return <>{lists}</>
  }
  /**
   * @description 新增目标
   */
  addTarget = () => {
    const list = this.state.targets
    list.push({ id: Math.random().toString(36).substr(2) })
    this.setState({ targets: list })
  }

  /**
   * @description 删除目标
   */
  delTarget = i => {
    const list = this.state.targets
    list.splice(i, 1)
    this.setState({ targets: list })
  }

  render() {
    return (
      <div className="container">
        {/* 侧边栏 */}
        <aside
          style={{ width: '261px', borderRight: '1px solid rgba(235,236,240,.6)', height: '100%' }}
        ></aside>
        {/* 内容 */}
        <div className="content">
          <section>
            <header></header>
            <div className="CustomPageTitle">
              <img src={tar_png} />
              <span>目标</span>
            </div>
            <div className="content-wrapper">
              <div className="IndexPage_layout-content">
                {/* tab栏 */}
                <div className="Tab_content">
                  <div className="Tab_menu">
                    <span>双月目标</span>
                  </div>
                </div>
                {/* 目标 */}
                <div className="MonthlyObjective_monthly-objective">
                  <div className="title"></div>
                  {/* <Target></Target> */}
                  <this.Objects></this.Objects>
                </div>
                {/* 新增目标按钮 */}
                <button className="add_btn" onClick={this.addTarget}>
                  <Plus theme="outline" size="16" fill="#494bbf" strokeLinecap="square" />
                  新增目标
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default App
