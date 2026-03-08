import { Option, Task } from "./SingleOptionsPicker"

interface TaskProps {
    task: Task
    handleUserAnswer: (task:Task, option: Option) => void
}
export const TaskComponent = ({task, handleUserAnswer} : TaskProps) => {

    return (<>
        <div className="task" key={task.id}>
            <p><b>Задача номер {task.taskNumber}</b></p>
            <p>{task.text}</p>
            <img src={task.imageUrl} />
            <ol>
                {task.options.map(option => (
                    <li className={`option ${option.isPicked ? "picked" : ""}`}
                        onClick={() => handleUserAnswer(task, option)}>
                            {option.text}
                    </li>
                ))}
            </ol>
        </div>
    </>)

}