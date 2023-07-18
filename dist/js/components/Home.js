class Home {
    constructor() {
      this.init();
    }
  
    init() {
      const homeContainer = document.querySelector('#home .home-container');
  
      const html = `
      <div class="home-container">
        <div class="home-container-top">
          <div class="hed1">
            <a>ORDER ONLINE</a>
            <p>Delicious food delivered to your door</p>
            <img src="images/home/pizza-1.jpg" alt="pz1">
          </div>
          <div class="hed2">
            <a>BOOK A TABLE</a>
            <p>lorerleorloe rleo lroe loerl ore lolr o</p>
            <img src="images/home/pizza-2.jpg" alt="pz2">
          </div>
          <div class="hed3">
            <p class="opening-style">OPENING HOURS:</p>
            <p>TUE-SUN, 12PM - 12AM</p>
          </div>
        </div>
      </div>
      `;
  
      homeContainer.innerHTML = html;
    }
  }
  
  export default Home;
  