import { createAnElement } from '../../utils/elementCreator.js';

export function kidData() {

    return axios.get('/api/kids').then((response) => {
        const currentKid = response.data.kidsData;
        console.log(currentKid)
        const kidName = createAnElement('div', {
            textContent: currentKid.name,
            id: 'kidsName'
        })
        const kidHeaderData = createAnElement('p', {
            id: 'rightData', 
            textContent: `${currentKid.total_cents} ${currentKid.total_points}`
        })

        kidName.appendChild(kidHeaderData)

        return kidName
    })
}