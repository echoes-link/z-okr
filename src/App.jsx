import React, { Component } from 'react'
import './style/index.scss'
import { Plus } from '@icon-park/react'
import Target from './components/target.jsx'

class App extends Component {
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
              <img src="../static/target.png" />
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
                  <Target></Target>
                </div>
                {/* 新增目标按钮 */}
                <button className="add_btn">
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
