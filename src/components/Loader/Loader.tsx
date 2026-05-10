import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <div
        className={css.spinner}
        aria-label="Завантаження..."
      />
      <p className={css.text}>
        Шукаємо фільми…
      </p>
    </div>
  );
};

export default Loader;
