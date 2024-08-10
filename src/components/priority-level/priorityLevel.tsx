import { useEffect } from 'react';
import './priorityLevel.css'

type priority = {
    level: number
}

export default function PriorityLevel(props: priority) {

    const defineLevel = () => {

        let level: any = document.getElementById('progress')

        let percentage = (props.level/5) * 100

        level.style.width = `${percentage}%`
    }

    useEffect(() => {
        defineLevel()
    }, [])

    return (
        <div id="priority-level">
            <div id="level-icon-circle">
            <img src="/level.png" alt="Logo do OrganizePro" id="level-icon" />
            </div>

            <div id="levels">
                <progress value="0" max="1" id='progress'></progress>
                <div id="ball">
                    <span id="level-text" className='opaque-ft-50 font-default'>{props.level}</span>
                </div>
            </div>
        </div>
    )
}