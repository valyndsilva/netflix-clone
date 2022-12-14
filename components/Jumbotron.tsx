import React from "react";
import jumbotronData from "../json/jumbotron.json";
import JumbotronItem from "./JumbotronItem";

function Jumbotron() {
  return (
    <>
      {jumbotronData.map((item) => (
        <JumbotronItem
          key={item.id}
          item={item}
          direction={item.direction}
          className={item.className}
        />
      ))}
    </>
  );
}

export default Jumbotron;
