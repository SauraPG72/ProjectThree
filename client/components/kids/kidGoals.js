import { createAnElement } from '../../utils/elementCreator.js';

export function kidGoals() {
    return axios.get('/api/kids/goals').then(response => {
        const kidGoals = response.data;
       

        const goalsBoxFinal = createAnElement('div', {
            innerHTML: `
            <div id="goalsHeader">
            <h1> Goals List:</h1>
            <h1 id="add-goals"> + </h1>
            </div>
            `
        })
        let goalsButt = goalsBoxFinal.querySelector('#add-goals');
        console.log(goalsButt)
        goalsButt.addEventListener('click', (event) => {
            let kidPage = document.getElementById('kidssPageWrapper')
            console.log(event)
            const addGoals = createAnElement('div', {
            innerHTML: `
            <h1> Make a goal:</h1>
            <form id="addGoalsForm">
                <input type="text" name="description" placeholder="Name your goal?">
                <input type="number" name="cents" placeholder="cents">
                <input type="number" name="points" placeholder="points">
                <input type="number" name="all-points" placeholder="Allocate points?">
                <input type="number" name="all-cents" placeholder="Allocate money?">
                <input type="submit">
            </form>
            `
        }) 
        const addGoalsForm = addGoals.querySelector('#addGoalsForm');
        addGoalsForm.addEventListener('submit', event => {
            console.log(event)
            event.preventDefault();
            const formData = new FormData(addGoalsForm);
            const data = {
                description: formData.get('description'),
                cents: formData.get('cents'),
                points: formData.get('points'),
                allPoints: formData.get('all-points'),
                allCents: formData.get('all-cents') 
            }
            axios.post('/api/kids/goals', data).then((response) => {
                console.log(response)
                location.reload()
            })
        })
        kidPage.innerHTML = '';
        kidPage.appendChild(addGoals);

            
        })

        for (const goal of kidGoals) {
            if (goal.cents) {
            const newGoal = createAnElement('div', {
                id: 'eachGoal',
                

                innerHTML: `
                <p>${goal.description}</p>
                <p>$${goal.cents * 0.1}</p>
                `

            })

            goalsBoxFinal.appendChild(newGoal)
        }
        else if (goal.points) {
            const newGoal = createAnElement('div', {
                id: 'eachGoal',
                

                innerHTML: `
                <p>${goal.description}</p>
                <p>${goal.points} points</p>
                `
            })
            
            goalsBoxFinal.appendChild(newGoal)
            
        }

        }
        return goalsBoxFinal
    })
}