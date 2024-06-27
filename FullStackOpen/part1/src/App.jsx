const Hello = (props) => {

  console.log(props)
  return (
    <div>
      <p>

        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  return (
    <>
    <h1>Greetings</h1>
    <Hello name='Maya' age={26 + 10} />
    </>
  )
}

export default App //don't delete.