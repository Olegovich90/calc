import React from "react";
import { IonButton } from "@ionic/react";

const Button = ({ content, color, handleClick }) => {
  return (
    <IonButton
      className={`Button ${content === "0" && "zero"}`}
      color={color ? color : "primary"}
      onClick={() => handleClick(content)}
    >
      {content}
    </IonButton>
  );
};

export default Button;
