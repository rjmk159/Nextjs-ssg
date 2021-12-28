import { useRouter } from 'next/router';

export default function Page(props) {
    const { isFallback } = useRouter();
    if (isFallback) {
        return <></>;
    }

    return <div>
        <h1>{props.data[0]?.title}</h1>
        <p  dangerouslySetInnerHTML={{__html: props.data[0]?.description}} ></p>
    </div>
}