import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SortableContainer } from 'react-sortable-hoc'
import TaskItem from './TaskItem'
import AddItem from './AddItem'
import { changeCurrentTask } from '../../actions'

class TaskTable extends React.Component {

  focusLast = () => {
    const { filteredTasks,changeCurrentTask } = this.props
    const lastId = filteredTasks[filteredTasks.length-1]
    changeCurrentTask(lastId)
  }

  focusUp = id => {
    const { filteredTasks,changeCurrentTask } = this.props
    const index = filteredTasks.indexOf(id)
    if(index > 0 && index < filteredTasks.length){
      const previousId = filteredTasks[index-1]
      changeCurrentTask(previousId)
    }
  }

  focusDown = id => {
    const { filteredTasks,changeCurrentTask } = this.props
    const index = filteredTasks.indexOf(id)
    if(index > -1 && index < filteredTasks.length-1){
      const nextId = filteredTasks[index+1]
      changeCurrentTask(nextId)
    }
  }

  render() {
    const { filteredTasks,fullTasks } = this.props
    console.log(filteredTasks);
    return (
      <div>
        <table className='TaskTable'>
          <tbody>
            {
              filteredTasks
              .map((id,index) => {
                const fullIndex = fullTasks.indexOf(id)
                return <TaskItem
                  key={id} id={id} index={fullIndex} //index 是dragItem需要的prop
                  focusDown={this.focusDown}
                  focusUp={this.focusUp}
                />
              })
            }
          </tbody>
        </table>
        <AddItem focusLast={this.focusLast} howManyTasks={filteredTasks.length} />
      </div>
    )
  }
}

TaskTable.propTypes = {
  filteredTasks: React.PropTypes.array.isRequired
}

const mapStateToProps = ({ tasks }) => ({
  fullTasks: tasks.allIds
})

TaskTable = withRouter(
  connect(
    mapStateToProps,
    {changeCurrentTask},
  )(TaskTable)
)


const SortableTaskTable = SortableContainer(({ filteredTasks }) => <TaskTable filteredTasks={filteredTasks}/>)

export default SortableTaskTable
