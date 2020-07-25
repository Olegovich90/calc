import React from "react";
import {
  IonApp,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonContent,
  IonModal,
  IonButton,
  IonToolbar,
  IonHeader,
  IonList,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import "./theme/themes.css";
import Button from "./Button";

const App = () => {
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState([]);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  let interm = React.useRef("");

  React.useEffect(() => {
    console.log("history", history);
  }, [history]);

  const handleClick = (content) => {
    if (content === "=") {
      if (!value) {
        //no '=' on first position
        return;
      } else {
        setValue(
          interm.current ? eval(interm.current) + eval(value) : eval(value)
        );
        setHistory([
          ...history,
          interm.current
            ? interm.current +
              "=" +
              eval(interm.current) +
              "+" +
              value +
              "=" +
              eval(interm.current + "+" + value)
            : value + "=" + eval(value),
        ]);
        setIsFinished(true);
        interm.current = "";
        return;
      }
    }
    if (content === "C") {
      setValue("");
      setIsFinished(false);
      return;
    }
    if (content === "CE") {
      if (value.length <= 1 || isFinished) {
        //cant eraise if no value
        setValue("");
        return;
      }
      //delete last element
      setValue(value && value.slice(0, -1));
      return;
    }
    if (content === "SBT") {
      if (interm.current) {
        //on 2nd and more SUBT
        interm.current = eval(interm.current) + "+" + value;
      } else {
        //on first SUBT
        interm.current = interm.current + value;
      }
      setValue(eval(value));
      setIsFinished(true);
      return;
    }
    if (isFinished) {
      //to avoid concat after equal or subt
      setValue(content);
      setIsFinished(false);
      return;
    }
    setValue(value + content);
  };

  return (
    <IonApp>
      <IonContent>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonButton onClick={() => setShowModal(false)}>
                <IonText>Close History</IonText>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {history &&
                history.map((ex, idx) => (
                  <IonRow key={idx}>
                    <IonText className="ex">{ex}</IonText>
                  </IonRow>
                ))}
            </IonList>
          </IonContent>
        </IonModal>
        <IonContent scrollEvents={false}>
          <IonGrid>
            <IonCol>
              <IonButton onClick={() => setShowModal(true)} className="histbtn">
                Show History
              </IonButton>
              <IonRow className="Input ion-justify-content-end">
                <IonText className="text">{value}</IonText>
              </IonRow>
              <IonRow>
                <Button
                  handleClick={handleClick}
                  content="C"
                  color="tertiary"
                />
                <Button
                  handleClick={handleClick}
                  content="CE"
                  color="tertiary"
                />
                <Button
                  handleClick={handleClick}
                  content="SBT"
                  color="tertiary"
                />
                <Button
                  handleClick={handleClick}
                  content="/"
                  color="secondary"
                />
              </IonRow>
              <IonRow>
                <Button handleClick={handleClick} content="7" />
                <Button handleClick={handleClick} content="8" />
                <Button handleClick={handleClick} content="9" />
                <Button
                  handleClick={handleClick}
                  content="*"
                  color="secondary"
                />
              </IonRow>
              <IonRow>
                <Button handleClick={handleClick} content="4" />
                <Button handleClick={handleClick} content="5" />
                <Button handleClick={handleClick} content="6" />
                <Button
                  handleClick={handleClick}
                  content="-"
                  color="secondary"
                />
              </IonRow>
              <IonRow>
                <Button handleClick={handleClick} content="1" />
                <Button handleClick={handleClick} content="2" />
                <Button handleClick={handleClick} content="3" />
                <Button
                  handleClick={handleClick}
                  content="+"
                  color="secondary"
                />
              </IonRow>
              <IonRow>
                <Button handleClick={handleClick} content="0" />
                <Button handleClick={handleClick} content="." />
                <Button
                  handleClick={handleClick}
                  content="="
                  color="secondary"
                />
              </IonRow>
            </IonCol>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonApp>
  );
};

export default App;
