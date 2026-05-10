import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({
  message,
}: ErrorMessageProps) => {
  return (
    <p className={css.error}>
      Помилка: {message}
    </p>
  );
};

export default ErrorMessage;
