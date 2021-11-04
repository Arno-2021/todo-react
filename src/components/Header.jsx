import React, { Component } from 'react'

export default class Header extends Component {
    state = {
        content: '',
    }
    render() {
        const { addList } = this.props
        return (
            <header className='header'>
                <h1>todos</h1>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    autoFocus
                    value={this.state.content}
                    onChange={e => this.setState({ content: e.target.value })}
                    onKeyUp={e => {
                        if (e.keyCode === 13) {
                            if (!this.state.content.trim()) {
                                this.setState({
                                    content: '',
                                })
                                return alert('请输入内容')
                            }
                            addList(this.state.content)
                            this.setState({
                                content: '',
                            })
                        }
                    }}
                />
            </header>
        )
    }
}
