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
      // setTestDoc(oldArr => [...oldArr, query.docs[i].id])
      // setTestDoc(oldArr => [...oldArr, query.docs[i]._document.data.value.mapValue.fields.highscore.integerValue])
      setTestDoc(oldArr => [...oldArr, {name: query.docs[i].id, highscore: query.docs[i]._document.data.value.mapValue.fields.highscore.integerValue}])
      console.log(testDoc)
    }
    // query.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   let x = doc.data()
      // setDocs({id: doc.id, score:doc.highscore})
    // setDocs(prevstate => [...prevstate, doc.id])
    // setScoresDoc(prevState => [...prevState, x.highscore])
    // setAllDocs([{
    //     name: doc.id,
    //     score: x.highscore
    // }])
    // setAllDocs(oldArr => [...oldArr, {name: doc.id, score: x.highscore}])
    // });

  };

  useEffect(() => {
    querydb();
    console.log(allDocs)
  }, []);

  //   docsnap();
  return (
    <div>
      {/* <h1>High scores</h1> */}
      {/* <h2>scores here: </h2> */}
  {/* <h2>name: {docs.id} score: {docs.score}</h2> */}
  {/* <h2>{docs}</h2> */}
  {/* <h2>scores doc: {scoresDoc}</h2> */}
  {/* <h4>{allDocs.name}, {allDocs.score}</h4> */}
    {allDocs.map((item) => {
        return (
        <h2>{item.name} {item.score}</h2>
        )
    })}
    <div  className="testDocMap">
      <div className="highscoreDiv">
      <h1>Name</h1> <h1>Time (Seconds)</h1>
      </div>
    {testDoc.map((item, index) => {
      return (
        <div key={index} className="highscoreDiv">
      <h2>{item.name.slice(0, -10)}</h2>
      {/* <h2>{item.name}</h2> */}
      <h2>{item.highscore}</h2>
        </div>
      )
    })}
    </div>
    </div>
  );
};

export default Highscores;
