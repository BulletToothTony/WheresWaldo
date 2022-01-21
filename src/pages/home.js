import "../index.css";
import { useState, useEffect, useRef } from "react";
import level1 from "../imgs/level-1.jpg";
// import firebase from '../src/utils/firebase';
import firebase from '../utils/firebase';
import "firebase/firestore";
import db from '../utils/firebase';
import {collection, getDocs, query, where, setDoc, doc} from 'firebase/firestore'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaldoHead from '../imgs/waldohead.jpg';
import OdlawHead from '../imgs/odlawhead.jpg';
import WizardHead from '../imgs/wizardhead.jpeg';


const Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [character, setCharacter] = useState("");
    const [wallyFound, setWallyFound] = useState(false)
    const [odlawFound, setOdlawFound] = useState(false)
    const [wizardFound, setWizardFound] = useState(false)
    const [waldoPosition, setWaldoPosition] = useState()
    const [odlawPosition, setOdlawPosition] = useState()
    const [wizardPosition, setWizardPosition] = useState()
    const [seconds, setSeconds] = useState(0);
    const [allFound, setAllfound] = useState(false)
    const [wallyFoundImg, setwallyFoundImg] = useState(false)
    const [odlawFoundImg, setOdlawFoundImg] = useState(false)
    const [wizardFoundImg, setWizardFoundImg] = useState(false)

  
    useEffect(() => {
     let interval = null;
     interval = setInterval(() => {
       setSeconds(seconds => seconds + 1)
     }, 1000);
  
     return () => clearInterval(interval)
    }, [seconds])
  
    const addData = async() => {
      await setDoc(doc(db, "highscores", "name"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
  
      // const res = await db.collection('highscores').doc('name').set(data);
  
  
    }
  
    useEffect(() => {
      // set timer here, the post to db
      // set all chars found to true
      // if (wallyFound && odlawFound && wizardFound) {
        if (wallyFound && odlawFound && wizardFound) {
  
        console.log('all characters found ' + seconds)
        alert('you found all characters in ' + seconds + ' seconds')
        const nameprompt = prompt('Add name: ')
        // post to db
        // db.collection("highscores").add({name: 'james', score: seconds})
  
        const date = Math.floor(Date.now() / 1000)
  
        const setDBName = async () => {
          // await setDoc(doc(db, "highscores", "name"), {name: nameprompt})
          await setDoc(doc(db, "highscores", nameprompt + date), {highscore: seconds})
  
  
        }
        // might need to name doc to the name of the user, then in there add a field for time
        setDBName()
        // addData()
        setAllfound(true)
        resetGame()
      }
  
      // setAllfound(true);
    }, [wallyFound, odlawFound, wizardFound, seconds])
  
    const resetGame = () => {
      setCharacter("")
      setWallyFound(false)
      setWizardFound(false)
      setOdlawFound(false)
      setSeconds(0)
      // set classes back
  
    }
  
    const divClickHandler = (e) => {
      console.log("clicked div");
      // console.log(e.nativeEvent.offsetX)
      // console.log(e.nativeEvent.offsetY)
      // setXCoord(e.nativeEvent.offsetX);
      // setYCoord(e.nativeEvent.offsetY);
  
      // screen.height
      // screen.width
      // console.log(window.screen.height / e.nativeEvent.offsetY)
      // console.log(window.screen.width  / e.nativeEvent.offsetX)
      const elementPosition = document
        .getElementById("picture1")
        .getBoundingClientRect();
        console.log(e.clientX - elementPosition.x + ' x')
        console.log(e.clientY - elementPosition.y + ' y')
        setXCoord(e.clientX - elementPosition.x)
        setYCoord(e.clientY - elementPosition.y)
        // get screen width for x coord and y coord
  
  
      setShowMenu(true);
  
      if (
        e.nativeEvent.offsetX >= 0 &&
        e.nativeEvent.offsetX <= 50 &&
        e.nativeEvent.offsetY >= 0 &&
        e.nativeEvent.offsetY <= 100
      ) {
        console.log("clicked successfully");
      }
  
      // console.log(character)
  
      // wally
      // x 678 - 722, y 518-432
    };
  
    const container = useRef(null);
  
    useEffect(() => {
      const submenu = container.current;
      // submenu.style.left = `50px`;

      let width = window.screen.width;

      // submenu.style.left = 50 + 400 + 'px'
      submenu.style.left = `${xCoord}px`;
      submenu.style.top = `${yCoord}px`;
      // submenu.style.top += 90
      // submenu.style.left += 200

  
      console.log(submenu);
    }, [xCoord, yCoord]);
  
  
    // Set positions from DB for Waldo, Odlaw, Wizard
    useEffect(() => {
      const userCollectionRef = collection(db, "solutions")
      const getUsers = async () => {
        const data = await getDocs(userCollectionRef)
        console.log(data.docs)
        console.log(data.docs[0]._document.data.value.mapValue.fields)
        console.log(data.docs[1]._document.data.value.mapValue.fields)
        console.log(data.docs[2]._document.data.value.mapValue.fields)
  
        setOdlawPosition(data.docs[0]._document.data.value.mapValue.fields)
        setWaldoPosition(data.docs[1]._document.data.value.mapValue.fields)
        setWizardPosition((data.docs[2]._document.data.value.mapValue.fields))
        // Set positions from firebase db
        
        // db.collection("solutions").doc("waldo").get().then((querySnapshot) => {
        //   setWaldoPosition(querySnapshot.data().xcoordhigh)
        // })
      };
      // })
      getUsers()
    }, [])
  
    const testCollection = () => {
      firebase.firestore().collection("solutions").document("waldo").get().then((snapshot) => {
        console.log(snapshot.data())
      }).catch((e) => console.log(e))
    }
  
    const testFirebase = () => {
      const firebasedb = collection(db, "solutions");
      // const q = query(firebasedb, where("odlaw", "==", true))
      const q = query(collection(db, "solutions"), where("odlaw", "==", true));
      console.log(q)
    }
  
    // testFirebase()
  
    // testCollection()
  
    const characterSelectionHandler = (char) => {
      setCharacter(char);
      checkIfWon();
      setShowMenu(false);
  
    };
  
    const checkIfWon = () => {
      if (
        character === "Waldo" &&
        xCoord >= waldoPosition.xcoordlow.integerValue && xCoord <= waldoPosition.xcoordhigh.integerValue &&
        yCoord >= waldoPosition.ycoordlow.integerValue && yCoord <= waldoPosition.ycoordhigh.integerValue
  
      ) {
        console.log("wally clicked");
        setWallyFound(true)
        setwallyFoundImg(true);
        setShowMenu(false);
      }
  
      if (
        character === "Odlaw" &&
        xCoord >= odlawPosition.xcoordlow.integerValue && xCoord <= odlawPosition.xcoordhigh.integerValue &&
        yCoord >= odlawPosition.ycoordlow.integerValue && yCoord <= odlawPosition.ycoordhigh.integerValue
      ) {
        console.log("odlaw clicked");
        setOdlawFound(true);
        setOdlawFoundImg(true);
        setShowMenu(false);
      }
  
      if (
        character === "Wizard" &&
        xCoord >= wizardPosition.xcoordlow.integerValue && xCoord <= wizardPosition.xcoordhigh.integerValue &&
        yCoord >= wizardPosition.ycoordlow.integerValue && yCoord <= wizardPosition.ycoordhigh.integerValue
      ) {
        console.log("Wizard clicked");
        setWizardFound(true);
        setWizardFoundImg(true);
        setShowMenu(false);
      }
    };
  
  
    return (
          <div className="App">
          <header className="App-header">
            <h2 className={`${wallyFound ? "wally wallyfound" : "wally"}`}>Wally</h2><img src={WaldoHead} className={`${wallyFoundImg ? "wallyImgFound" : "wallyImg"}`} alt="wallyHead"></img>
            <h2 className={`${odlawFound ? "odlaw odlawfound" : "odlaw"}`}>Odlaw</h2><img src={OdlawHead} className={`${odlawFoundImg ? "odlawImgFound" : "odlawImg"}`} alt="odlawHead"></img>
            <h2 className={`${wizardFound ? "wizard wizardfound" : "wizard"}`}>Wizard</h2><img src={WizardHead} className={`${wizardFoundImg ? "wizardImgFound" : "wizardImg"}`} alt="wizardHead"></img>
          </header>
    
          <div className="divGrey" id="picture1">
            <img
              className="level1img"
              src={level1}
              id="picture"
              alt="where's waldo?"
              onClick={divClickHandler}
            ></img>
            <div
              className={`${showMenu ? "showmenu show" : "showmenu"}`}
              ref={container}
            >
              <div
                onClick={() => characterSelectionHandler("Waldo")}
                className="characterDiv"
              >
                <img src={WaldoHead} className={`${wallyFoundImg ? "wallyImgFound   " : "wallyImg"}`} alt="wallyHead"></img>
                Waldo
              </div>
              <div
                onClick={() => characterSelectionHandler("Odlaw")}
                className="characterDiv"
              >
                <img src={OdlawHead} className={`${odlawFoundImg ? "odlawImgFound" : "odlawImg"}`} alt="odlawHead"></img>
                Odlaw
              </div>
              <div
                onClick={() => characterSelectionHandler("Wizard")}
                className="characterDiv"
              >
                <img src={WizardHead} className={`${wizardFoundImg ? "wizardImgFound" : "wizardImg"}`} alt="wizardHead"></img>
                Wizard 
              </div>
            </div>
            <div className="targetBox"></div>
          </div>
        </div>
        // </Router>
      );
    }

export default Home;