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
  const [testDoc, setTestDoc] = useState([])

  const docRef = doc(db, "highscores", "HenryTestName");
  const docsnap = async () => {
    await getDoc(docRef);
    console.log(docsnap);
  };

  const querydb = async () => {
    const query = await getDocs(collection(db, "highscores"));
    console.log(query.docs)
    for (let i = 0; i < query.docs.length; i++) {
      console.log(query.docs[i].id)
      setTestDoc(oldArr => [...oldArr, query.docs[i].id])
      console.log(testDoc)
    }
    // query.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   let x = doc.data()
    //   setDocs({id: doc.id, score:doc.highscore})
    // setDocs(prevstate => [...prevstate, doc.id])
    // setScoresDoc(prevState => [...prevState, x.highscore])
    // setAllDocs([{
    //     name: doc.id,
    //     score: x.highscore
    // }])
    // });

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
  <h2>scores doc: {scoresDoc}</h2>
  <h4>{allDocs.name}, {allDocs.score}</h4>
    {allDocs.map((item) => {
        return (
        <h2>{item.name} {item.score}</h2>
        )
    })}
    <h1> test doc map</h1>
    {testDoc.map((item) => {
      return (
      <h2>{item}</h2>
      )
    })}
    </div>
  );
};

export default Highscores;
