import { createAnElement } from "../../utils/elementCreator.js";

export async function kidsBalance() {
   const expended = {}
   const total = await axios.get('api/kids/kids/data')
   const kidsData = await axios.get('api/kids')

   let availableCents = parseInt(kidsData.data.kidsData.total_cents) - parseInt(total.data.centGoals)
   let availablePoints = parseInt(kidsData.data.kidsData.total_cents) - parseInt(total.data.pointGoals)
   console.log(availablePoints)

            const balance = createAnElement('div', {
                id: "kid-balance-bar",
                classname: "item",
                innerHTML: `
                <div>
                <div> Available balance: </div>
                <div> Available points: </div>
                </div>
                <div id="wrapped-data">
                <div><i class="fa-solid fa-sack-dollar"></i> : $${availableCents * 0.01} </div>
                <div><i class="fa-solid fa-star-half-stroke"></i> : ${availablePoints}</div>
                </div>
                ` 
            })
                


    
    return balance

    
}