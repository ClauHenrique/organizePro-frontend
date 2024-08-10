import { useEffect } from 'react';
import './priorityLevel.css'

type priority = {
    level: number
}

export default function PriorityLevel(props: priority) {

    const defineLevel = () => {

        const levelIntensity = [
            '#a3d9a3',
            'linear-gradient(to right, #ffffcc, #ffeb99)',
            'linear-gradient(to right, #ffd9b3, #ffad99)',
            'linear-gradient(to right, #ffcc99, #ff9966)',
            '#ff6666',
        ]
        
        for (let i = 1; i <= props.level; i++) {
           let elem = document.getElementById(`level-${i}`)
           if (elem) { 
            elem.style.background = levelIntensity[i -1]
         }
        }
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
                <div id="level-1" className='lv'></div>
                <div id="level-2" className='lv'></div>
                <div id="level-3" className='lv'></div>
                <div id="level-4" className='lv'></div>
                <div id="level-5" className='lv'></div>
            </div>
        </div>
    )
}