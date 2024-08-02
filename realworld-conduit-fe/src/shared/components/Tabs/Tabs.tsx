import React, { useState } from 'react'
import { TabsProps } from './Tabs.type'
import './Tabs.scss'
const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='tabs-container'>
      <div className='tab-headers'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-header ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className='tab-content'>{tabs[activeTab].content}</div>
    </div>
  )
}

export default Tabs
