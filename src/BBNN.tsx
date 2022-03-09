import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {getCountryData} from "./api/endpoints";
import './bbnn.scss'
import Indicator from "./Indicator";
import ParamTypes from "./ParamTypes"

function BBNN() {

  const {countryId} = useParams<ParamTypes>();
  const [indicators, setIndicators] = useState<Indicator[]>();
  const [selected, setSelected] = useState<string>();
  const [hovered, setHovered] = useState<String>();

  let hover = (what: String) => () => {
    setHovered(what);
  }

  let clearHover = () => {
    setHovered('');
  }

  let select = (what: string) => () => {
    setSelected(what);
  }

  let highlighted = (what: String) => {
    return what === selected || what === hovered
  }

  useEffect(() => {
    const fetchData = async () => {
      setIndicators(await getCountryData(countryId))
    }
    fetchData()
  }, [])

  const lastCurrentAccount = indicators
      ?.find((indicator) => indicator.name === 'Current Account to GDP')
      ?.series.find((seriesItem) => seriesItem.date === "2019-01-01")
      ?.value

  const lastWageGrowth = indicators
      ?.find((indicator) => indicator.name === 'Wage Growth')
      ?.series.find((seriesItem) => seriesItem.date === "2019-01-01")
      ?.value

  const lastInflationRate = indicators
      ?.find((indicator) => indicator.name === 'Inflation Rate')
      ?.series.find((seriesItem) => seriesItem.date === "2019-01-01")
      ?.value

  const realWageGrowth = (lastWageGrowth ?? 0) - (lastInflationRate ?? 0);

  const calculateCoordinates = (current: number | undefined, wage: number | undefined) => {
    if (!current || !wage) return [0, 0]
    let scaledCurrent = current * 10, scaledWage = wage * 10;
    let x = 100 - scaledCurrent, y = 100 - scaledCurrent;
    return [x + scaledWage, y - scaledWage]
  }

  let [x, y] = calculateCoordinates(lastCurrentAccount, realWageGrowth)

  return (
      <div className="bbnn">
        <h2 className="bbnn-title">BBNN Model</h2>
        <section className="bbnn-content">
          <section className="bbnn-model">
            <svg xmlns="http://www.w3.org/2000/svg" className="bbnn-graph" viewBox="0 0 200 200"
                 preserveAspectRatio={"xMinYMax meet"}>

              <defs>
                <marker id="startarrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="10 0, 10 7, 0 3.5"/>
                </marker>
                <marker id="endarrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7"/>
                </marker>
                <marker id="startarrow-grey" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"
                        className={selected}>
                  <polygon points="10 0, 10 7, 0 3.5"/>
                </marker>
                <marker id="endarrow-grey" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"
                        className={selected}>
                  <polygon points="0 0, 10 3.5, 0 7"/>
                </marker>
              </defs>

              <line className="axis" x1="20" y1="180" x2="180" y2="180" markerEnd="url(#endarrow)"/>
              <text x="50" y="190" className="axis-legend">Domestic Aggregate Demand</text>
              <line className="axis" x1="20" y1="20" x2="20" y2="180" markerStart="url(#startarrow)"/>
              <text x="-130" y="12" transform="rotate(270)" className="axis-legend">Competitiveness</text>

              <line className={`has-details internal ${selected === 'internal' ? 'selected' : ''}`} x1="30" y1="30"
                    x2="170" y2="170" onClick={select('internal')}/>

              {selected === 'internal' && [
                <line className="internal-details" x1="95" y1="135" x2="135" y2="95" strokeDasharray={"2 2"}
                      markerStart="url(#startarrow-grey)" markerEnd="url(#endarrow-grey)"/>,
                <text x="115" y="103" className={`small ${selected}`}>Overheating</text>,
                <text x="85" y="130" className={`small ${selected}`}>Unemployment</text>,
                <text x="135" y="130" className={`small line-title ${selected}`}>Internal Equilibrium Line</text>
              ]}

              <line className={`has-details external ${selected === 'external' ? 'selected' : ''}`} x1="30" y1="170"
                    x2="170" y2="30" onClick={select('external')}/>

              {selected === 'external' && [
                <line className="external-details" x1="95" y1="65" x2="135" y2="105" strokeDasharray={"2 2"}
                      markerStart="url(#startarrow-grey)" markerEnd="url(#endarrow-grey)"/>,
                <text x="119" y="97" className={`small ${selected}`}>Deficit</text>,
                <text x="94" y="75" className={`small ${selected}`}>Surplus</text>,
                <text x="135" y="73" className={`small line-title ${selected}`}>External Equilibrium Line</text>
              ]}

              <line className={`has-details social ${selected === 'social' ? 'selected' : ''}`} x1="30" y1="150"
                    x2="170" y2="150" onClick={select('social')}/>

              {selected === 'social' && [
                <line className="social-details" x1="80" y1="130" x2="80" y2="170" strokeDasharray={"2 2"}
                      markerStart="url(#startarrow-grey)" markerEnd="url(#endarrow-grey)"/>,
                <text x="85" y="143" className={`small ${selected}`}>Social Unrest</text>,
                <text x="85" y="160" className={`small ${selected}`}>Social Peace</text>,
                <text x="85" y="175" className={`small line-title ${selected}`}>Social Peace Line</text>
              ]}


              <circle className="has-details equilibrium" cx="100" cy="100" r={`${highlighted('equilibrium') ? 4 : 2}`}
                      onMouseOver={hover('equilibrium')}
                      onMouseLeave={clearHover} onClick={select('equilibrium')}/>
              {selected === 'equilibrium' && [
                <text x="108" y="102" className={`small line-title ${selected}`}>Equilibrium Point</text>
              ]}

              <circle className="has-details elitism" cx="50" cy="150" r={`${highlighted('elitism') ? 4 : 2}`}
                      onMouseOver={hover('elitism')}
                      onMouseLeave={clearHover} onClick={select('elitism')}/>
              {selected === 'elitism' && [
                <text x="50" y="162" className={`small line-title ${selected}`}>Elitism Point</text>
              ]}

              <circle className="has-details populism" cx="150" cy="150" r={`${highlighted('populism') ? 4 : 2}`}
                      onMouseOver={hover('populism')}
                      onMouseLeave={clearHover} onClick={select('populism')}/>
              {selected === 'populism' && [
                <text x="150" y="142" className={`small line-title ${selected}`}>Populism Point</text>
              ]}

              <circle className="circle first-circle" fill="#FF6347" cx={x} cy={y} r="5"
                      transform-origin={`${x}px ${y}px`}/>
              <circle className="circle second-circle" fill="#FF6347" cx={x} cy={y} r="5"
                      transform-origin={`${x}px ${y}px`}/>
              <circle className="circle third-circle" fill="#FF6347" cx={x} cy={y} r="5"
                      transform-origin={`${x}px ${y}px`}/>
              <circle className="circle" fill="#FF6347" cx={x} cy={y} r="5" transform-origin={`${x}px ${y}px`}/>

            </svg>
          </section>

          <section className="bbnn-explanation">
            {selected === 'internal' &&
            <h3>The internal equilibrium line</h3>
            }
            {selected === 'external' &&
            <h3>The external equilibrium line</h3>
            }
            {selected === 'social' &&
            <h3>The social peace line</h3>
            }
            {selected === 'equilibrium' &&
            <h3>The equilibrium point</h3>
            }
            {selected === 'elitism' &&
            <h3>The elitism point</h3>
            }
            {selected === 'populism' &&
            <h3>The populism point</h3>
            }
          </section>
        </section>
      </div>
  )
}

export default BBNN
