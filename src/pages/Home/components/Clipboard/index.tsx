import styles from './styles.module.css'
import clipboardIcon from '../../../../assets/clipboard-icon.svg'

export function Clipboard() {
  return (
    <div className={styles.empty}>
      <img src={clipboardIcon} alt="" />
      <p className={styles.emptyMessage}>
        Você ainda não tem tarefas cadastradas
      </p>
      <span className={styles.emptyMessage}>
        Crie tarefas e organize seus itens a fazer
      </span>
    </div>
  )
}
