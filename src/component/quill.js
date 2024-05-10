import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export const TextEditor = ({ onChange, value, name }) => {
    // const [html, setHtml] = useState('my <b>HTML</b>');

    function chnage(e) {
        onChange(e.target.value, name);
    }

    return (
        <Editor value={value} onChange={chnage} />
    );
}
export default TextEditor;