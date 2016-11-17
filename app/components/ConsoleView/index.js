import React from 'react'
import styles from './ConsoleView.css'

const ConsoleView = ({ service, clearConsoleForService }) => {
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
      <span
        className={styles.clear}
        onClick={() => { clearConsoleForService(service.id) }}
      >
        Clear Console
      </span>
      <div className={styles.bg} />
      <div className={styles.text}>
        {!service.lastCommandCleared && text}
      </div>
    </div>
  )
}

export default ConsoleView
