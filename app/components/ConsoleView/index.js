import React from 'react'
import styles from './ConsoleView.css'

const ConsoleView = ({ service }) => {
  let text = (
    <pre>No commands run yet. Deploy your service!</pre>
  )
  if (service.commands && service.commands.length) {
    text = (
      <pre>{ service.commands[0].output }</pre>
    )
  }
  return (
    <div className={styles.console}>
      <div className={styles.bg} />
      <div className={styles.text}>
        {text}
      </div>
    </div>
  )
}

export default ConsoleView
