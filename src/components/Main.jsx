import React, { Component, createRef } from 'react'
import '../style/main.css'
const ipt = createRef()
export default class Main extends Component {
    state = {
        content: '',
    }
    edit = async (id, isEdit) => {
        await this.props.showEdit(id, isEdit)
        ipt.current.focus()
    }
    render() {
        const { list, del, changeDone, checkedAll, toggleAll, editList } =
            this.props
        return (
            <section className='main'>
                <input
                    id='toggle-all'
                    className='toggle-all'
                    type='checkbox'
                    checked={checkedAll}
                    onChange={() => {
                        toggleAll(checkedAll)
                    }}
                />
                <label htmlFor='toggle-all'>Mark all as complete</label>
                <ul className='todo-list'>
                    {list.map(item => (
                        <li
                            className={item.done ? 'completed' : ''}
                            key={item.id}
                        >
                            <div className='view'>
                                <input
                                    className='toggle'
                                    type='checkbox'
                                    checked={item.done}
                                    onChange={() =>
                                        changeDone(item.id, item.done)
                                    }
                                />
                                <label
                                    onDoubleClick={this.edit.bind(
                                        this,
                                        item.id
                                    )}
                                    className={item.isEdit ? 'label-show' : ''}
                                >
                                    {item.content}
                                </label>
                                <button
                                    className='destroy'
                                    onClick={() => del(item.id)}
                                ></button>
                            </div>
                            <input
                                ref={ipt}
                                className={`edit ${
                                    item.isEdit ? 'ipt-show' : ''
                                }`}
                                value={this.state.content}
                                onChange={e =>
                                    this.setState({ content: e.target.value })
                                }
                                onDoubleClick={this.edit.bind(this, item.id)}
                                onKeyUp={e => {
                                    if (e.keyCode === 13) {
                                        editList(item.id, this.state.content)
                                        this.setState({
                                            content: '',
                                        })
                                    }
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
