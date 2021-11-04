import { Component } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
class App extends Component {
    state = {
        list: JSON.parse(localStorage.getItem('list')) || [],
        tabs: ['All', 'Active', 'Complete'],
        checked: 'All',
        checkedAll: false,
    }
    addList = content => {
        const obj = {
            id: Date.now(),
            content: content,
            done: false,
            isEdit: false,
        }
        this.setState({
            list: [obj, ...this.state.list],
        })
    }
    del = id => {
        this.setState({
            list: this.state.list.filter(item => item.id !== id),
        })
    }
    switchTabs = type => {
        this.setState({
            checked: type,
        })
    }
    changeDone = (id, done) => {
        this.setState({
            list: this.state.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        done: !done,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    toggleAll = checked => {
        this.setState({
            checkedAll: !checked,
            list: this.state.list.map(item => {
                return {
                    ...item,
                    done: !checked,
                }
            }),
        })
    }
    clearCompleted = () => {
        this.setState({
            list: this.state.list.filter(item => item.done === false),
        })
    }
    showEdit = id => {
        this.setState({
            list: this.state.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        isEdit: !item.isEdit,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    editList = (id, content) => {
        this.setState({
            list: this.state.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        content,
                        isEdit: false,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.list !== prevState.list) {
            localStorage.setItem('list', JSON.stringify(this.state.list))
            this.setState({
                checkedAll: this.state.list.every(item => item.done === true),
            })
        }
    }
    render() {
        const { list, tabs, checked, checkedAll } = this.state
        let showList = []
        if (checked === 'Active') {
            showList = [...list].filter(item => item.done === false)
        } else if (checked === 'Complete') {
            showList = [...list].filter(item => item.done === true)
        } else {
            showList = [...list]
        }
        return (
            <div>
                <section className='todoapp'>
                    <Header addList={this.addList}></Header>
                    <Main
                        list={showList}
                        del={this.del}
                        changeDone={this.changeDone}
                        checkedAll={checkedAll}
                        toggleAll={this.toggleAll}
                        showEdit={this.showEdit}
                        editList={this.editList}
                    ></Main>
                    {list.length === 0 ? null : (
                        <Footer
                            list={list}
                            tabs={tabs}
                            checked={checked}
                            switchTabs={this.switchTabs}
                            clearCompleted={this.clearCompleted}
                        ></Footer>
                    )}
                </section>
            </div>
        )
    }
}
export default App
