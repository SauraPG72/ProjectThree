import { createAnElement } from "../../utils/elementCreator.js";

export function renderMainPage() {
  app.innerHTML = "";
  const welcomePageContainer = document.getElementById("main-page-container");

  const welcomeScreen = createAnElement("main", {
    id: "main-page-container",
    innerHTML: `  		<div id="hero-image">
			<img src="./assets/images/pexels-agung-pandit-wiguna-1128318.jpg" alt="" class="hero-image">
			<div class="overlay"></div>
			<div class="text-overlay">
				<h1 id="hero-header">Get your kids on the right financial track</h1>
				<h2 id="sub-header">It's never to early to teach responsibility. Divita gives you all the tools you need
					to make sure
					they are prepared for the future.</h2>
				<button class="hero-button">Get Started</button>
			</div>
		</div>
		<div id="main-page-points">
			<div id="point-left" class="main-page-point"><i class="fa-solid fa-wallet"></i>
				<p>
					Create an account for each of your kids
				</p>
			</div>
			<div id="point-centre" class="main-page-point"><i class="fa-solid fa-piggy-bank"></i>
				<p>Teach them how to save using the zero-based budgeting system</p>
			</div>
			<div id="point-right" class="main-page-point"><i class="fa-solid fa-hand-holding-dollar"></i>
				<p>Allow them to earn money or points which they can redeem</p>
			</div>
		</div>`,
  });
  welcomePageContainer.append(welcomeScreen);
}
