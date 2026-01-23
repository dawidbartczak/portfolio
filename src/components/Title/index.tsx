import styles from "./Title.module.scss";

type TitleProps = {
    title: string;
}

export default function Title({ title }: TitleProps) {
    return (
        <h2 className={styles.title}>{title}</h2>
    );
}
