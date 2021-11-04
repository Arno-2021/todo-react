import React, { Component } from 'react'

export default class Footer extends Component {
    count = () => {
        return this.props.list.filter(item => item.done === false).length
    }
    render() {
        const { tabs, checked, switchTabs, clearCompleted } = this.props
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong>{this.count()}</strong> item left
                </span>
                <ul className='filters'>
                    {tabs.map(item => (
                        <li key={item} onClick={() => switchTabs(item)}>
                            <a
                                className={item === checked ? 'selected' : ''}
                                href='#/'
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <button
                    className='clear-completed'
                    onClick={() => {
                        clearCompleted()
                    }}
                >
                    Clear completed
                </button>
            </footer>
        )
    }
}
