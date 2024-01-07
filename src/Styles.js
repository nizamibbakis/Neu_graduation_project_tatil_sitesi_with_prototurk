import { Title } from "./Components";
import Bootstrap from "./Bootstrap";
import Test from "./Test"
import logo from "./logo.svg"
import styles from './App.module.css'


function Styles(){
    return(
        <div className={styles.App}>
      <h1>deneme</h1>
      <Test/>
      <Title>kamilcan çelik</Title>

      <Bootstrap/>
    </div>
    )
}
export default Styles