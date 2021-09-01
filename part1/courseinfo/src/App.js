import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (    
    <h1>{props.courseName}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part objPart={props.parts[0]}/>
      <Part objPart={props.parts[1]}/>
      <Part objPart={props.parts[2]}/>
    </div>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0] + props.parts[1] + props.parts[2]}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.objPart.name} {props.objPart.exercises}</p>
  )
}


export default App