import styles from "app/page.module.css";
import Search from "/components/Search";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className="cta">
        <h2>Want to know if the weather is right for a barbecue?</h2>
        <h3>Check out what the weather is like where you plan to mici!</h3>
      </div>
      <Search />
    </div>
  );
}
1