const Configuration = ({buildFloors, setLifts}) => {
  const { useRef } = React;
  const floorsRef = useRef(null);
  const liftsRef = useRef(null);
  const build = () => {
    buildFloors(Number(floorsRef.current.value)+1); 
    setLifts(Number(liftsRef.current.value));
  };
  return (
    <section>
      <div className="simulation-config">
        <fieldset>
          <legend>Simulation Configuration</legend>
          <label htmlFor="floors">
            Floors (2-50):
            <input ref={floorsRef} min="2" max="50" type="number" name="floors" id="floors" defaultValue="4" />
          </label>
          <label htmlFor="lifts">
            Lifts (1-4):
            <input ref={liftsRef} min="1" max="4" type="number" name="lifts" id="lifts" defaultValue="2" />
          </label>
          <button onClick={build}>Rebuild</button>
        </fieldset>
      </div>
    </section>
  )
};

const Building = ({heading, floors, lifts, setLiftPosition}) => {
  (floors = floors).shift();
  (floors = floors).reverse();
  const moveLift = (e) => {
    const liftElements = [];
    lifts.map(item => {
      liftElements[item+1] = document.querySelector('[data-lift="'+(item+1)+'"]');
    });
    const floor = e.target.dataset['floor'];
    const direction = e.target.dataset['direction'];
    const multiplier = Number(floor-1) * 100;
    const currentLift =  Math.floor(Math.random() * ((lifts.length+1) - 1) + 1);
    const updatedValue = {};
    updatedValue[currentLift] = Number(floor);
    setLiftPosition( (prevState)=>({
      ...prevState,
      ...updatedValue
    }));
    liftElements[currentLift].style.cssText = `bottom: ${multiplier}px;`;
  };
  return (
    <section>
      <h2>{heading}</h2>
      <div className="building">
        <div className="floor-container">

          {
            floors.map( item => {
              return(
                <div className={`floor floor-${item}`}>
                  <div className="button-container">
                    <button onClick={moveLift} data-floor={`${item}`} data-direction="up" className="button button-up">Up</button>
                    <button onClick={moveLift} data-floor={`${item}`} data-direction="down" className="button button-down">Down</button>
                  </div>
                  <span className="board">Floor {item}</span>
                </div>
              )}
            )
          }
        
        </div>
        <div className="lift-container">
          {
            lifts.map(item => {
              return (
                <div className="lift" data-lift={`${item+1}`}></div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
};

const Simulation = () => {
  const { useState } = React;
  const [floors, setFloors] = useState(5);
  const [lifts, setLifts] = useState(2);
  const [liftPosition, setLiftPosition] = useState({
    1:1,
    2:1,
    3:1,
    4:1
  });
  return (
    <>
      <Configuration
        buildFloors={setFloors}
        setLifts={setLifts}
        />
      <Building 
        heading="Building" 
        setLiftPosition={setLiftPosition}
        floors={[ ...Array(floors).keys() ] } 
        lifts={[ ...Array(lifts).keys() ] }
      />
    </>
  )
};

ReactDOM.render(
  <Simulation />,
  document.getElementById('app')
);