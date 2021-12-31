import "./index.css";
import { useState, useEffect, useRef } from "react";
import level1 from "./imgs/level-1.jpg";
// import firebase from '../src/utils/firebase';
import firebase from './utils/firebase';
import "firebase/firestore";
import db from './utils/firebase';
import {collection, getDocs, query, where} from 'firebase/firestore'

function App() {
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
      .getElementById("picture")
      .getBoundingClientRect();
      console.log(e.clientX - elementPosition.x + ' x')
      console.log(e.clientY - elementPosition.y + ' y')
      setXCoord(e.clientX - elementPosition.x)
      setYCoord(e.clientY - elementPosition.y)


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
    submenu.style.left = `${xCoord}px`;
    submenu.style.top = `${yCoord}px`;

    console.log(submenu);
  }, [xCoord]);


  // Set positions from DB for Waldo, Odlaw, Wizard
  useEffect(() => {
    const userCollectionRef = collection(db, "solutions")
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      console.log(data.docs)
      console.log(data.docs[0]._document.data.value.mapValue.fields.xcoordhigh)
      setOdlawPosition(data.docs[0]._document.data.value.mapValue.fields.xcoordhigh)
      setWaldoPosition(data.docs[1]._document.data.value.mapValue.fields.xcoordhigh)
      setWizardPosition((data.docs[2]._document.data.value.mapValue.fields.xcoordhigh))
      
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
      xCoord >= 514 &&
      xCoord <= 570 &&
      yCoord >= 340 &&
      yCoord <= 415
    ) {
      console.log("wally clicked");
      setWallyFound(true)
      setShowMenu(false);
    }

    if (
      character === "Odlaw" &&
      xCoord >= 234 &&
      xCoord <= 267 &&
      yCoord >= 356 &&
      yCoord <= 435
    ) {
      console.log("odlaw clicked");
      setOdlawFound(true);
      setShowMenu(false);
    }

    if (
      character === "Wizard" &&
      xCoord >= 620 &&
      xCoord <= 662 &&
      yCoord >= 352 &&
      yCoord <= 428
    ) {
      console.log("Wizard clicked");
      setWizardFound(true);
      setShowMenu(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Where's Wally?</h1>
        <h2 className={`${wallyFound ? "wally wallyfound" : "wally"}`}>Wally</h2>
        <h2 className={`${odlawFound ? "odlaw odlawfound" : "odlaw"}`}>Odlaw</h2>
        <h2 className={`${wizardFound ? "wizard wizardfound" : "wizard"}`}>Wizard</h2>
      </header>

      <div className="divGrey">
        <img
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
            Waldo
          </div>
          <div
            onClick={() => characterSelectionHandler("Odlaw")}
            className="characterDiv"
          >
            Odlaw
          </div>
          <div
            onClick={() => characterSelectionHandler("Wizard")}
            className="characterDiv"
          >
            Wizard
          </div>
        </div>
        <div className="targetBox"></div>
      </div>
    </div>
  );
}

export default App;
