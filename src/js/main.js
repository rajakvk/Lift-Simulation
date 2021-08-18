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
            Floors:
            <input ref={floorsRef} min="2" max="50" type="number" name="floors" id="floors" defaultValue="4" />
          </label>
          <label htmlFor="lifts">
            Lifts:
            <input disabled ref={liftsRef} type="number" name="lifts" id="lifts" defaultValue="1" />
          </label>
          <button onClick={build}>Rebuild</button>
        </fieldset>
      </div>
    </section>
  )
};

const moveLift = (e) => {
  const lift = document.querySelector('.lift');
  const floor = e.target.dataset['floor'];
  const direction = e.target.dataset['direction'];
  const multiplier = Number(floor-1) * 100;
  lift.style.cssText = `bottom: ${multiplier}px;`;
}

const Building = ({heading, floors, lifts}) => {
  (floors = floors).shift();
  (floors = floors).reverse();
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
                <div className="lift"></div>
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
  const [lifts, setLifts] = useState(1);
  return (
    <>
      <Configuration
        buildFloors={setFloors}
        setLifts={setLifts}
      />
      <Building 
        heading="Building" 
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