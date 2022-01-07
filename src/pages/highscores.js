import React, { useEffect, useState } from "react";
import db from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const Highscores = () => {
  const [docs, setDocs] = useState([]);
  const [scoresDoc, setScoresDoc] = useState([])
  const [allDocs, setAllDocs] = useState([])

  const docRef = doc(db, "highscores", "HenryTestName");
  const docsnap = async () => {
    await getDoc(docRef);
    console.log(docsnap);
  };

  const querydb = async () => {
    const query = await getDocs(collection(db, "highscores"));
    query.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let x = doc.data()
    //   setDocs({id: doc.id, score:doc.highscore})
    setDocs(prevstate => [...prevstate, doc.id])
    setScoresDoc(prevState => [...prevState, x.highscore])
    setAllDocs([{
        name: doc.id,
        score: x.highscore
    }])
    });
  };

  useEffect(() => {
    querydb();
    console.log(allDocs)
  }, []);

  //   docsnap();
  return (
    <div>
      <h1>High scores</h1>
      <h2>scores here: </h2>
  {/* <h2>name: {docs.id} score: {docs.score}</h2> */}
  <h2>{docs}</h2>
  <h2>{scoresDoc}</h2>
  <h4>{allDocs.name}, {allDocs.score}</h4>
    {allDocs.map((item) => {
        return (
        <h2>{item.name}</h2>
        )
    })}
    </div>
  );
};

export default Highscores;
