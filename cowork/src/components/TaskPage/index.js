import React from 'react'
import { connect } from 'react-redux'
import TableFilter from './TableFilter'
import TaskTable from './TaskTable'
import { changeTaskOrder } from '../../actions'
import { getFilteredTasks } from '../../reducers/index'


class TaskPage extends React.Component {

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.changeTaskOrder(oldIndex,newIndex)
  }//拖拽的lib要求的方法

  filterArray = [{
    name:"my tasks",
    filter:{
      users:{name: "Riddle"},
    }
  }]//试验性的结构

  render() {
    const { store } = this.props
    return (
      <div className='TaskPage'>
        <TableFilter filterArray={this.filterArray} />
        <TaskTable
          filteredTasks={getFilteredTasks(store)}
          onSortEnd={this.onSortEnd}
          useDragHandle />
      </div>
    )
  }
}

TaskPage.propTypes = {

}

const mapStateToProps = state => ({
  store:state,
})

TaskPage = connect(mapStateToProps,
  {changeTaskOrder}
)(TaskPage)


export default TaskPage
