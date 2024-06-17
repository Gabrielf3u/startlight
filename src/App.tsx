import React from 'react';
import './App.css';
import logo from './logo.svg';
import BarryAndSonsWine from './imgs/BarryAndSons.png';
import BrownBrothers from './imgs/BrownBrothers.jpg';
import Ricossa from './imgs/Ricossa.jpg';
import PeterLehmann from './imgs/PeterLehmann.jpg';
import WitchesFalls from './imgs/WitchesFalls.jpg';

import { useEffect, useState } from "react";
import { Nav } from 'reactstrap';
import TabItem from "./components/Tabs/TabItem";
import TabList from "./components/Tabs/TabList";
import Timer from "./components/Timer"

import calculateTimeInSeconds from './components/TimeHelper';
import Controls from './components/StopWatch';

type courseItems = {
  courseList: courseItem[];
}

type courseItem = {
  wine: courseWine;
  food: courseFood;
  itemHour: number;
  itemMinutes: number;
}

type courseWine = {
  name: string;
  notes: string;
  picture: string;
}

type courseFood = {
  chef: string;
  course: string;
  name: string;
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => { setInterval(() => setCurrentTime(new Date()), 1000); }, []);
  /**/

  const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timeArray, setTimeArray] = useState<Array<number|string>>([]);

    useEffect(() => {
        setTimeArray(calculateTimeInSeconds(timeInSeconds));
    }, [timeInSeconds]);

  const courseWine1: courseWine = { name: "Witches Falls 2023 Provenance Vermentino", notes: "warmed cherries spiced with anise, clove and cinnamon.", picture: WitchesFalls }
  const courseFood1: courseFood = { chef: 'Chef Phil Marchant (Essa)', course: "First Course", name: "Smoked Kombu cream, shitake, XO"}
  const menuCourse1: courseItem = { itemHour: 18, itemMinutes: 52, food: courseFood1, wine: courseWine1}

  const courseWine2: courseWine = { name: "Jim Barry 'Barry & Sons' Riesling", notes: "fresh grapefruit and citrus rind.", picture: BarryAndSonsWine}
  const courseFood2: courseFood = { chef: 'Chef Bastian Boll (Sofitel)', course: "Second Course", name: "Cured trout, crème fraiche and apple cucumber salsa"}
  const menuCourse2: courseItem = { itemHour: 19, itemMinutes: 34, food: courseFood2, wine: courseWine2 }

  const courseWine3: courseWine = { name: "Ricossa Langhe Nebbiolo DOC", notes: "warmed cherries spiced with anise, clove and cinnamon.", picture: Ricossa}
  const courseFood3: courseFood = { chef: 'Chef Cameron Matthews (Mapleton)', course: "Third Course", name: "Roasted Octopus, nduja, carrot and smoked coconut" }
  const menuCourse3: courseItem = { itemHour: 20, itemMinutes: 9, food: courseFood3, wine: courseWine3}

  const courseWine4: courseWine = { name: "Peter Lehmann Shoulder to Shoulder Shiraz", notes: "Aromas of black fruits, chocolate and mixed spice.", picture: PeterLehmann }
  const courseFood4: courseFood = { chef: 'Chef Ben Willimson (Agnes)', course: "Fourth Course", name: "Wagyu eye fillet, charred vegetable condiment, salted onions and bitter leaves" }
  const menuCourse4: courseItem = { itemHour: 21, itemMinutes: 35, food: courseFood4, wine: courseWine4 }

  const courseWine5: courseWine = { name: "Brown Brothers Premium Cuvee Rose NV", notes: "Aromas of strawberries and cream, and light citrus.", picture: BrownBrothers }
  const courseFood5: courseFood = { chef: 'Chef Gianna Ephraims (Otto)', course: "Fifth Course", name: "Rhubarb, strawberry, yoghurt and white chocolate, pistachio" }
  const menuCourse5: courseItem = { itemHour: 22, itemMinutes: 38, food:courseFood5, wine: courseWine5}

  const menuCourses: courseItems = { courseList: [ menuCourse1, menuCourse2, menuCourse3, menuCourse4, menuCourse5 ] }

  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()

  const listCountDownTimes = menuCourses.courseList.map((cItem) =>
    <div className="textGap">{cItem.food.course} Course in <Timer time={((((cItem.itemHour - hours) * 60) + cItem.itemMinutes - minutes) * 60)} /></div>)

  const listCoursesAndChef = menuCourses.courseList.map((cItem) =>
    <li className="textGap"><b>{cItem.food.chef}</b> <br /> {cItem.food.course} | {cItem.itemHour}:{cItem.itemMinutes >= 10 ? cItem.itemMinutes : `0` + cItem.itemMinutes}</li>)

  const stopWatchTab = 
  <TabItem label="Stopwatch">
    <div className=''>
      <section className="timer-display">
        <p className='lgText'>{timeArray[0]} : {timeArray[1]} : {timeArray[2]}</p>
      </section>
      <Controls setTimeInSeconds={setTimeInSeconds} />
    </div>
  </TabItem>

  const listMenuItems = menuCourses.courseList.map((cItem) =>
    <TabItem label={cItem.food.course}>
      <p><div><div id="logoText" className='lgText'><b>{cItem.food.chef}</b></div> <div className='smText'>Meal: {cItem.food.name}</div></div></p>
      <div className='polaroid'>
        <img id="borderRadius" src={cItem.wine.picture} className="App-picture" alt="Picture of Wine" /> 
        <div className="container">
          <p><b>{cItem.wine.name}</b></p>
          <p>Notes: {cItem.wine.notes}</p>
          {stopWatchTab}
        </div>
      </div>
    </TabItem>)

  return (
    <div className="App">
      <div className='left split'>
        <header className="App-header">
          <div className='animation animation2'>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div id="logoText" className="lgText">SOFITEL</div>
          <div id="logoText" className="smText">LUXURY HOTELS</div>

          <h2>Starlight Runsheet</h2>
          <ul className="a">
            <li className="textGap">Cocktail 18:00 &#40;Ann Street Lobby&#41;</li>
            <li className="textGap">Ballroom Doors Open 18:30</li>
            {listCoursesAndChef}
            <li className="textGap">Tea &#38; Coffee Service</li>
            <li className="textGap">Cuvee Post Dinner Bar</li>
          </ul>
        </header>
      </div>
      <div className='right split'>
        <header className="App-header">
          <div className='custom-tabs'>
            <Nav className="border-bottom pb-3 gap-2 justify-content-center" role="tablist" aria-orientation="horizontal" as="ul">
              <TabList activeTabIndex={0}>
                {listMenuItems}
              </TabList>
            </Nav>
          </div>
          <section className="container">
            <div id="clock" className='xlgText'><b>{currentTime.toLocaleTimeString()}</b></div>
          </section>
          <ul className="b">
            {listCountDownTimes}
          </ul>
        </header>
      </div>
    </div >
  );
}

export default App;
